# Example Usage in ICAP Micro Frontend

This guide shows how to integrate the ICAP UI Library into your micro frontend SPA.

## Step 1: Install the Library

```bash
npm install @icap/ui-library
```

## Step 2: Import Styles

In your main entry file (e.g., `src/main.tsx` or `src/index.tsx`):

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@icap/ui-library/styles'; // Import Tailwind styles
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Step 3: Use Components in Your App

```tsx
// src/App.tsx
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  Badge,
  Input,
  cn
} from '@icap/ui-library';

function App() {
  const [showAlert, setShowAlert] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ICAP Dashboard
          </h1>
          <Badge variant="success" size="lg">
            UI Library Active
          </Badge>
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert
            variant="success"
            title="Welcome!"
            closable
            onClose={() => setShowAlert(false)}
            className="mb-6"
          >
            The ICAP UI Library is working correctly. All Tailwind classes are available!
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Form Card */}
          <Card shadow="medium">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                User Information
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
                helperText="We'll use this to send you updates"
                required
              />
              
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                helperText="First and last name"
              />
              
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  onClick={handleSubmit}
                  disabled={!email}
                >
                  {loading ? 'Saving...' : 'Save Information'}
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                System Status
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <Badge variant="success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cache</span>
                  <Badge variant="warning">Warming</Badge>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Refresh
                </Button>
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button variant="primary" leftIcon={<span>📊</span>}>
            View Analytics
          </Button>
          <Button variant="secondary" leftIcon={<span>⚙️</span>}>
            Settings
          </Button>
          <Button variant="outline" leftIcon={<span>📥</span>}>
            Export Data
          </Button>
          <Button variant="ghost" leftIcon={<span>❓</span>}>
            Help
          </Button>
        </div>

        {/* Custom Styled Section */}
        <div className={cn(
          "mt-12 p-8 rounded-xl",
          "bg-gradient-to-br from-primary-500 to-secondary-600",
          "text-white shadow-xl"
        )}>
          <h3 className="text-2xl font-bold mb-4">
            Custom Styling with Tailwind
          </h3>
          <p className="text-primary-100 mb-6">
            This section demonstrates using Tailwind classes directly from the library
            without any additional setup in your micro frontend.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-semibold">Styled</h4>
              <p className="text-sm text-primary-100">Pre-designed components</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold">Fast</h4>
              <p className="text-sm text-primary-100">Zero configuration</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2">🔧</div>
              <h4 className="font-semibold">Flexible</h4>
              <p className="text-sm text-primary-100">Fully customizable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

## Step 4: Custom Components

You can create your own components using the library:

```tsx
// src/components/CustomCard.tsx
import React from 'react';
import { Card, CardBody, Badge, cn } from '@icap/ui-library';

interface CustomCardProps {
  title: string;
  status: 'online' | 'offline' | 'maintenance';
  children: React.ReactNode;
  className?: string;
}

export function CustomCard({ title, status, children, className }: CustomCardProps) {
  const statusConfig = {
    online: { color: 'success' as const, text: 'Online' },
    offline: { color: 'error' as const, text: 'Offline' },
    maintenance: { color: 'warning' as const, text: 'Maintenance' }
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant={statusConfig[status].color}>
            {statusConfig[status].text}
          </Badge>
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
```

## Step 5: TypeScript Integration

For full TypeScript support:

```tsx
// src/types/components.ts
import type { ButtonProps, CardProps } from '@icap/ui-library';

export interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  tooltip?: string;
}

export interface DashboardCardProps extends CardProps {
  title: string;
  subtitle?: string;
}
```

## Notes for Micro Frontend Architecture

1. **No Tailwind Installation**: Don't install Tailwind CSS in your micro frontend - the library provides everything you need.

2. **Consistent Styling**: All micro frontends using this library will have consistent styling automatically.

3. **Bundle Size**: The library is tree-shakeable, so you only bundle the components you use.

4. **Hot Reloading**: During development, changes to Tailwind classes will hot reload correctly.

5. **Production Builds**: The CSS is pre-compiled and optimized for production.

This approach ensures all your ICAP micro frontends share the same design system while maintaining independence in their development and deployment.