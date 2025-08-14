# ICAP UI Library

A shared Tailwind CSS component library for ICAP micro frontend applications. This library provides a consistent design system and reusable components across all ICAP SPAs without requiring individual installations of Tailwind CSS in each application.

## 🚀 Features

- **Zero Tailwind Setup**: No need to install Tailwind CSS in your SPAs
- **Pre-built Components**: Ready-to-use React components with consistent styling
- **TypeScript Support**: Full type definitions included
- **Customizable**: Easily extendable with your own styling
- **Modern Build**: ES modules and CommonJS support
- **Tree Shakeable**: Import only what you need

## 📦 Installation

```bash
npm install @icap/ui-library
```

## 🎨 Usage

### Basic Setup

Import the CSS styles in your main application file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@icap/ui-library/styles';
```

### Using Components

```tsx
import React from 'react';
import { Button, Card, CardHeader, CardBody, Alert } from '@icap/ui-library';

function App() {
  return (
    <div className="p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <h1 className="text-xl font-bold">Welcome to ICAP</h1>
        </CardHeader>
        <CardBody>
          <Alert variant="success" className="mb-4">
            UI Library is working correctly!
          </Alert>
          <Button variant="primary" size="lg" fullWidth>
            Get Started
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
```

### Using Tailwind Classes Directly

Since the library includes all Tailwind CSS, you can use any Tailwind classes directly in your components:

```tsx
import React from 'react';
import { cn } from '@icap/ui-library';

function MyComponent() {
  return (
    <div className={cn(
      "bg-gradient-to-r from-blue-500 to-purple-600",
      "text-white p-6 rounded-lg shadow-lg",
      "hover:shadow-xl transition-shadow duration-300"
    )}>
      <h2 className="text-2xl font-bold mb-4">Custom Styled Component</h2>
      <p className="text-blue-100">
        This component uses Tailwind classes from the library!
      </p>
    </div>
  );
}
```

## 🧩 Components

### Button

A flexible button component with multiple variants and sizes.

```tsx
import { Button } from '@icap/ui-library';

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With icons and loading state
<Button 
  leftIcon={<span>📁</span>}
  loading={isLoading}
  onClick={handleClick}
>
  Save File
</Button>
```

### Card

A container component with optional header, body, and footer sections.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@icap/ui-library';

<Card shadow="medium">
  <CardHeader>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here...</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

### Alert

Display important messages with different severity levels.

```tsx
import { Alert } from '@icap/ui-library';

<Alert variant="success" title="Success!" closable onClose={handleClose}>
  Your changes have been saved successfully.
</Alert>

<Alert variant="warning">
  Please review your settings before continuing.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

### Badge

Small status indicators and labels.

```tsx
import { Badge } from '@icap/ui-library';

<Badge variant="primary">New</Badge>
<Badge variant="success" size="lg">Completed</Badge>
<Badge variant="warning" dot>3 pending</Badge>
```

### Input

Form input with label, validation, and helper text support.

```tsx
import { Input } from '@icap/ui-library';

<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  required
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>
```

## 🎨 Custom Styling

### Using the `cn` Utility

The library exports a `cn` (className) utility for conditional class names:

```tsx
import { cn } from '@icap/ui-library';

function MyButton({ isActive, className }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        isActive && 'bg-blue-500 text-white',
        !isActive && 'bg-gray-200 text-gray-700',
        className
      )}
    >
      Click me
    </button>
  );
}
```

### Extending Components

You can extend the library components with your own styling:

```tsx
import { Button } from '@icap/ui-library';

function MyCustomButton(props) {
  return (
    <Button
      {...props}
      className={cn(
        'shadow-glow hover:scale-105 transform transition-all',
        props.className
      )}
    />
  );
}
```

## 🎨 Color System

The library includes a comprehensive color system:

- **Primary**: Blue tones for main actions
- **Secondary**: Gray tones for secondary elements  
- **Success**: Green tones for positive feedback
- **Warning**: Yellow/Orange tones for warnings
- **Error**: Red tones for errors
- **Info**: Blue tones for informational content

Each color has shades from 50 (lightest) to 950 (darkest).

```tsx
// Examples of using the color system
<div className="bg-primary-500 text-white">Primary background</div>
<div className="text-success-600">Success text</div>
<div className="border-warning-300">Warning border</div>
```

## 📝 TypeScript Support

The library is built with TypeScript and includes full type definitions:

```tsx
import type { ButtonProps, CardProps, AlertProps } from '@icap/ui-library';

// All props are fully typed
const MyButton: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  // TypeScript will provide full autocomplete and type checking
  return <Button variant={variant} size={size} {...props} />;
};
```

## 🔧 Development

If you need to modify or extend the library:

```bash
# Clone the repository
git clone <repository-url>
cd icap-ui-library

# Install dependencies
npm install

# Start development mode
npm run dev

# Build the library
npm run build
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Examples

Check out the examples directory for complete usage examples with different frameworks and setups.

---

Built with ❤️ for the ICAP team.