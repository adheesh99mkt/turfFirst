# ICAP UI Library - VS Code Implementation Guide

## 🎯 Overview
This guide will help you implement the ICAP UI Library from VS Code, creating a shared Tailwind CSS component library for your micro frontends.

## 📋 Prerequisites
- VS Code installed
- Node.js (v16 or higher)
- npm or yarn
- Basic knowledge of React and TypeScript

## 🚀 Phase 1: Project Setup

### Step 1: Create Project in VS Code

1. **Open VS Code**
2. **Open Terminal** (Ctrl+` or View → Terminal)
3. **Navigate to workspace**:
   ```bash
   cd /path/to/your/icap/workspace
   ```
4. **Create and open project**:
   ```bash
   mkdir icap-ui-library
   cd icap-ui-library
   code .
   ```

### Step 2: Initialize Package

1. **Initialize npm project**:
   ```bash
   npm init -y
   ```

2. **Install dependencies**:
   ```bash
   # Development dependencies
   npm install -D tailwindcss@latest autoprefixer postcss @types/node typescript rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-dts rollup-plugin-postcss tslib @tailwindcss/forms

   # Production dependencies  
   npm install react react-dom @types/react @types/react-dom clsx
   ```

### Step 3: Create Folder Structure

Create this structure in VS Code Explorer:
```
icap-ui-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Alert/
│   │   ├── Badge/
│   │   └── Input/
│   ├── styles/
│   ├── types/
│   └── utils/
├── dist/
└── [config files]
```

**VS Code Tip**: Right-click in Explorer → "New Folder" to create directories.

## 🔧 Phase 2: Configuration Files

### Step 4: Update package.json

Replace the content of `package.json`:

```json
{
  "name": "@icap/ui-library",
  "version": "1.0.0",
  "type": "module",
  "description": "Shared Tailwind CSS component library for ICAP micro frontends",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "rollup -c && npm run build:css",
    "build:css": "tailwindcss -i ./src/styles/main.css -o ./dist/styles.css --minify",
    "dev": "rollup -c -w",
    "prepublishOnly": "npm run build"
  },
  "keywords": ["tailwindcss", "component-library", "react", "icap", "ui"],
  "author": "ICAP Team",
  "license": "MIT",
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "dependencies": {
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "@rollup/plugin-typescript": "^11.0.0",
    "@tailwindcss/forms": "^0.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "rollup": "^4.0.0",
    "rollup-plugin-dts": "^6.0.0",
    "rollup-plugin-postcss": "^4.0.0",
    "tailwindcss": "^3.4.0",
    "tslib": "^2.6.0",
    "typescript": "^5.0.0"
  }
}
```

### Step 5: Create Configuration Files

**Create `tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.*", "**/*.spec.*"]
}
```

**Create `rollup.config.js`**:
```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.*', '**/*.spec.*'],
      }),
      postcss({
        config: { path: './postcss.config.js' },
        extensions: ['.css'],
        minimize: true,
        inject: { insertAt: 'top' },
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
```

**Initialize Tailwind**:
```bash
npx tailwindcss init -p
```

**Update `tailwind.config.js`**:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Add other colors (secondary, success, warning, error)
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
```

**Update `postcss.config.js`**:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🧩 Phase 3: Create Components

### Step 6: Create Type Definitions

**Create `src/types/index.ts`**:
```typescript
import { ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

// Add other component prop interfaces...
```

### Step 7: Create Utility Functions

**Create `src/utils/cn.ts`**:
```typescript
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

### Step 8: Create Styles

**Create `src/styles/main.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-secondary {
    @apply bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  /* Add other component styles... */
}
```

### Step 9: Create Components

**Create `src/components/Button/Button.tsx`**:
```typescript
import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ButtonProps } from '../../types';

const buttonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline font-medium transition-colors duration-200',
};

const buttonSizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    fullWidth && 'w-full',
    variant !== 'link' && 'rounded-lg',
    className
  );

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" /* ... spinner SVG ... */>
            {/* Spinner SVG content */}
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
```

**Create `src/components/Button/index.ts`**:
```typescript
export { default as Button } from './Button';
export type { ButtonProps } from '../../types';
```

### Step 10: Create Main Index Files

**Create `src/components/index.ts`**:
```typescript
export * from './Button';
export * from './Card';
export * from './Alert';
export * from './Badge';
export * from './Input';
export type * from '../types';
```

**Create `src/index.ts`**:
```typescript
import './styles/main.css';

export * from './components';
export { cn } from './utils/cn';
export type * from './types';
```

## 🔨 Phase 4: Build and Test

### Step 11: Build the Library

1. **Run the build**:
   ```bash
   npm run build
   ```

2. **Check output** in `dist/` folder:
   - `index.js` (CommonJS)
   - `index.esm.js` (ES modules)
   - `index.d.ts` (TypeScript definitions)
   - `styles.css` (Compiled Tailwind CSS)

### Step 12: Create Documentation

**Create comprehensive `README.md`** with usage examples.

## 🚀 Phase 5: Using in Micro Frontends

### Step 13: Publish or Link Library

**Option A: Publish to npm**:
```bash
npm publish
```

**Option B: Local development** (in library directory):
```bash
npm link
```

### Step 14: Use in Micro Frontend

1. **In your SPA project**:
   ```bash
   npm install @icap/ui-library
   # OR for local development:
   npm link @icap/ui-library
   ```

2. **Import styles in main file** (`main.tsx` or `App.tsx`):
   ```typescript
   import '@icap/ui-library/styles';
   ```

3. **Use components**:
   ```typescript
   import { Button, Card, Alert } from '@icap/ui-library';
   
   function App() {
     return (
       <div className="p-8 bg-gray-50"> {/* Direct Tailwind usage! */}
         <Card>
           <Alert variant="success">UI Library working!</Alert>
           <Button variant="primary">Click me</Button>
         </Card>
       </div>
     );
   }
   ```

## 🎯 VS Code Tips

### Essential Extensions:
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **TypeScript Importer**: Auto import management
- **Prettier**: Code formatting
- **ES7+ React/Redux/React-Native snippets**: React snippets

### VS Code Settings for This Project:
```json
{
  "editor.formatOnSave": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### Useful VS Code Shortcuts:
- `Ctrl+Shift+P`: Command palette
- `Ctrl+``: Toggle terminal
- `Ctrl+B`: Toggle sidebar
- `Ctrl+Shift+E`: Explorer
- `F2`: Rename symbol

## 🔄 Development Workflow

1. **Make changes** to components in `src/`
2. **Run build**: `npm run build`
3. **Test in micro frontend**
4. **Commit changes**
5. **Update version** in `package.json`
6. **Publish/update** in consuming apps

## 🎉 You're Done!

Your ICAP UI Library is now ready! All your micro frontends can use Tailwind CSS and consistent components without individual Tailwind installations.

## 📞 Next Steps

1. **Add more components** as needed
2. **Set up CI/CD** for automatic publishing
3. **Create Storybook** for component documentation
4. **Add unit tests** with Jest/React Testing Library
5. **Set up design tokens** for even more consistency

Happy coding! 🚀