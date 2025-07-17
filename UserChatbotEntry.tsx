import React, { useEffect, useState } from 'react';
import { Uploader, Input, Button, Panel } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { addChatbotInformations } from '../api/write_endpoints';
import { toast } from 'react-toastify';
import { TableChatbot } from './chatbotTable';
import { LocalStorageKeys } from '../constants/url_constants';
import mammoth from 'mammoth';
import { useFilterContext } from '../context';
import { fetchChatbotEntries } from '../api/read_endpoints';

const UserChatbotEntry = ({ tableData }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [textField, setTextField] = useState<string>('');
    const [extractedContent, setExtractedContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingText, setEditingText] = useState<string>('');
    const [showUploader, setShowUploader] = useState<boolean>(false)
    const { setTableData, workflowCredentials } = useFilterContext()

    const readFileContent = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const fileName = file.name.toLowerCase();

            if (file.size === 0) {
                reject(new Error('File is empty'));
                return;
            }

            if (fileName.endsWith('.txt')) {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsText(file, 'UTF-8');

            }
            else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
                const fileReader = new FileReader();
                fileReader.onload = async () => {
                    try {
                        const result = await mammoth.extractRawText({ arrayBuffer: fileReader.result as ArrayBuffer });
                        resolve(result.value);
                    } catch (error) {
                        reject(error);
                    }
                };
                fileReader.onerror = reject;
                fileReader.readAsArrayBuffer(file);

            } else {
                reject(new Error('Unsupported file type'));
            }
        });
    };

    const handleFileChange = (fileList: any[]) => {
        const actualFiles = fileList
            .map(fileObj => {
                return fileObj.blobFile || fileObj.file || fileObj;
            })
            .filter(file =>
                file instanceof File &&
                (file.name.endsWith('.txt') ||
                    file.name.endsWith('.doc') ||
                    file.name.endsWith('.docx'))
            )

        if (actualFiles.length !== fileList.length) {
            toast.error("Only .txt,.doc and .docx files are allowed.")
        }

        setFiles(actualFiles);
    };

    const handleLoad = async () => {
        if (files.length === 0 && !textField.trim()) {
            return;
        }

        setIsLoading(true);
        let combinedContent = '';

        try {
            for (const file of files) {
                try {
                    const content = await readFileContent(file);
                    combinedContent += content;
                    if (files.length > 1) {
                        combinedContent += '\n\n';
                    }
                } catch (error) {
                    console.error(`Error reading file ${file.name}:`, error);
                }
            }

            if (textField.trim()) {
                if (combinedContent) {
                    combinedContent += '\n\n';
                }
                combinedContent += textField.trim();
            }

            setExtractedContent(combinedContent);

        } catch (error) {
            console.error('Error processing files:', error);
            toast.error("Failed to extract content from files.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setTextField('');
        setExtractedContent('');
        setIsEditing(false);
        setEditingText('');
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditingText(extractedContent);
    };

    const handleSaveEdit = () => {
        setExtractedContent(editingText);
        setIsEditing(false);
        setEditingText('');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingText('');
    };

    const exportContent = async () => {
        if (!extractedContent.trim()) {
            toast.error("No content to export.");
            return;
        }
        const cleanedContent = extractedContent
            .split('\n')
            .filter(line => line.trim() !== '')
            .join('\n');

        const apiPayload = {
            userId: localStorage.getItem(LocalStorageKeys.USER_ID),
            contents: {
                content: cleanedContent,
            }
        };

        try {
            setIsLoading(true);
            const response = await addChatbotInformations(apiPayload, workflowCredentials.user, workflowCredentials.password);
            if (response[0]['success']) {
                toast.success("Contents exported successfully");
                setExtractedContent('');
                fetchChatbotEntries().then((res) => {
                    setTableData(res)
                })
                handleClear();
                setShowUploader(false);
            } else {
                toast.error("Contents export failed")
                throw new Error(`API Error: ${response}`);
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error("Failed to export contents. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full mx-auto overflow-hidden h-full max-h-screen">
            {!showUploader ? (
                <Panel className="h-full flex flex-col">
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-3 xs:gap-4">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-800">
                            Chatbot contents
                        </h2>
                        <button
                            title="Upload"
                            onClick={() => setShowUploader(true)}
                            className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-violet-500 shadow-sm rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
                        >
                            <i className="fa-duotone fa-solid fa-cloud-arrow-up mr-2"></i>
                            <span className="hidden xs:inline">Upload</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <TableChatbot tableData={tableData} />
                    </div>
                </Panel>
            ) : (
                <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4 xl:gap-6 h-full">
                    {/* Left Side - Upload Section */}
                    <div className="flex-1 xl:flex-none overflow-hidden">
                        <Panel bordered className="rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                            <div className="flex-shrink-0">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                                    Upload Files & Load Content
                                </h2>
                                <hr className="mb-6 border-gray-200" />
                            </div>

                            <div className="flex-shrink-0 mb-6">
                                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                                    Upload Files
                                </label>
                                <Uploader
                                    fileList={files.map((file, index) => ({
                                        name: file.name,
                                        fileKey: index + 1,
                                        status: 'finished'
                                    }))}
                                    onChange={handleFileChange}
                                    draggable
                                    accept=".txt,.doc,.docx"
                                    multiple
                                    autoUpload={false}
                                    removable={true}
                                    onRemove={(fileObj) => {
                                        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileObj.name));
                                    }}
                                    action=""
                                    renderFileInfo={(file, fileElement) => (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center min-w-0 flex-1">
                                                <span className="text-sm sm:text-base truncate">{file.name}</span>
                                                <span className="ml-2 text-xs sm:text-sm text-gray-500 flex-shrink-0">
                                                    ({file.name.split('.').pop()?.toUpperCase()})
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors duration-200">
                                        <div className="px-4">
                                            <i className="fa-duotone fa-solid fa-cloud-arrow-up text-2xl sm:text-3xl text-gray-400 mb-2"></i>
                                            <p className="text-sm sm:text-base text-gray-600">
                                                <span className="hidden sm:inline">Click or Drag to Upload</span>
                                                <span className="sm:hidden">Tap to Upload</span>
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                .txt, .doc, .docx files only
                                            </p>
                                        </div>
                                    </div>
                                </Uploader>
                            </div>

                            <div className="flex-1 min-h-0 mb-6">
                                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                                    Additional Text
                                </label>
                                <Input
                                    as="textarea"
                                    placeholder="Enter additional text..."
                                    value={textField}
                                    onChange={(value) => setTextField(value)}
                                    className="w-full h-full min-h-[120px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px] resize-none text-sm sm:text-base"
                                />
                            </div>

                            <div className="flex-shrink-0">
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <Button
                                        appearance="subtle"
                                        onClick={() => {
                                            setShowUploader(false)
                                            handleClear()
                                        }}
                                        className="w-full sm:w-auto order-2 sm:order-1"
                                    >
                                        <i className="fa-solid fa-arrow-left mr-2"></i>
                                        Back
                                    </Button>
                                    <Button
                                        appearance="primary"
                                        onClick={handleLoad}
                                        disabled={files.length === 0 && !textField.trim()}
                                        loading={isLoading}
                                        className="w-full sm:flex-1 order-1 sm:order-2"
                                    >
                                        <i className="fa-solid fa-file-text mr-2"></i>
                                        Extract Content
                                    </Button>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    {/* Right Side - Content Display */}
                    <div className="flex-1 xl:flex-none overflow-hidden">
                        <Panel bordered className="rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex-shrink-0">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                                        {extractedContent ? 'Extracted Content' : 'Content Preview'}
                                    </h2>
                                    {extractedContent && (
                                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full xs:w-auto">
                                            <Button
                                                appearance="subtle"
                                                onClick={handleClear}
                                                className="w-full xs:w-auto text-sm order-3 xs:order-1"
                                            >
                                                <i className="fa-solid fa-trash mr-2"></i>
                                                Clear
                                            </Button>
                                            {!isEditing && (
                                                <Button
                                                    appearance="ghost"
                                                    onClick={handleEdit}
                                                    className="w-full xs:w-auto text-sm order-2"
                                                >
                                                    <i className="fa-solid fa-edit mr-2"></i>
                                                    Edit
                                                </Button>
                                            )}
                                            <Button
                                                appearance="primary"
                                                onClick={exportContent}
                                                loading={isLoading}
                                                className="w-full xs:w-auto text-sm order-1 xs:order-3"
                                            >
                                                <i className="fa-solid fa-upload mr-2"></i>
                                                Export
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <hr className="mb-6 border-gray-200" />
                            </div>

                            {/* Content Display/Edit Area */}
                            <div className="flex-1 overflow-hidden">
                                {extractedContent ? (
                                    <div className="h-full flex flex-col">
                                        {isEditing ? (
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex-1 mb-4">
                                                    <Input
                                                        as="textarea"
                                                        value={editingText}
                                                        onChange={(value) => setEditingText(value)}
                                                        className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] font-mono text-sm sm:text-base leading-relaxed resize-none"
                                                        placeholder="Edit your content here..."
                                                    />
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="flex flex-col xs:flex-row gap-3">
                                                        <Button
                                                            appearance="primary"
                                                            onClick={handleSaveEdit}
                                                            className="w-full xs:flex-1 order-1"
                                                        >
                                                            <i className="fa-solid fa-save mr-2"></i>
                                                            Save Changes
                                                        </Button>
                                                        <Button
                                                            appearance="ghost"
                                                            color="red"
                                                            onClick={handleCancelEdit}
                                                            className="w-full xs:w-auto order-2"
                                                        >
                                                            <i className="fa-solid fa-times mr-2"></i>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full overflow-hidden">
                                                <Input
                                                    as="textarea"
                                                    value={extractedContent}
                                                    disabled={true}
                                                    className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] font-mono text-sm sm:text-base leading-relaxed resize-none bg-gray-50"
                                                    placeholder="Content will appear here..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center text-gray-500 px-4 max-w-md">
                                            <i className="fa-duotone fa-solid fa-file-text text-4xl sm:text-5xl lg:text-6xl mb-4 text-gray-300"></i>
                                            <p className="text-base sm:text-lg lg:text-xl font-medium mb-2">
                                                No content loaded yet
                                            </p>
                                            <p className="text-sm sm:text-base text-gray-400">
                                                Upload files or enter text and click "Extract Content" to see the content here
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Panel>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserChatbotEntry;