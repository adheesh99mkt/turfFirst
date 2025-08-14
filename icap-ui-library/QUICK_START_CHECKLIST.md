# 🚀 ICAP UI Library - Quick Start Checklist

## ✅ Pre-Implementation Checklist

- [ ] VS Code installed
- [ ] Node.js v16+ installed
- [ ] npm/yarn available
- [ ] Basic React/TypeScript knowledge

## 📁 Step 1: Project Setup (5 mins)

```bash
# Create project
mkdir icap-ui-library
cd icap-ui-library
code .

# Initialize
npm init -y
```

## 📦 Step 2: Install Dependencies (3 mins)

```bash
# Dev dependencies
npm install -D tailwindcss@latest autoprefixer postcss @types/node typescript rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-dts rollup-plugin-postcss tslib @tailwindcss/forms

# Production dependencies
npm install react react-dom @types/react @types/react-dom clsx
```

## 🏗️ Step 3: Create Structure (2 mins)

Create folders in VS Code Explorer:
- [ ] `src/components/Button/`
- [ ] `src/components/Card/`
- [ ] `src/components/Alert/`
- [ ] `src/components/Badge/`
- [ ] `src/components/Input/`
- [ ] `src/styles/`
- [ ] `src/types/`
- [ ] `src/utils/`
- [ ] `dist/`

## ⚙️ Step 4: Configuration Files (10 mins)

### Copy and create these files:

- [ ] **Update `package.json`** → [Copy from implementation guide]
- [ ] **Create `tsconfig.json`** → [Copy from implementation guide]
- [ ] **Create `rollup.config.js`** → [Copy from implementation guide]
- [ ] **Run:** `npx tailwindcss init -p`
- [ ] **Update `tailwind.config.js`** → [Copy from implementation guide]
- [ ] **Update `postcss.config.js`** → [Copy from implementation guide]

## 🧩 Step 5: Create Core Files (15 mins)

### Essential files to create:

- [ ] `src/types/index.ts` → [Copy type definitions]
- [ ] `src/utils/cn.ts` → [Copy utility function]
- [ ] `src/styles/main.css` → [Copy Tailwind styles]

### Component files:
- [ ] `src/components/Button/Button.tsx`
- [ ] `src/components/Button/index.ts`
- [ ] Repeat for other components (Card, Alert, Badge, Input)

### Index files:
- [ ] `src/components/index.ts`
- [ ] `src/index.ts`

## 🔨 Step 6: Build & Test (2 mins)

```bash
npm run build
```

Check for these files in `dist/`:
- [ ] `index.js`
- [ ] `index.esm.js` 
- [ ] `index.d.ts`
- [ ] `styles.css`

## 🚀 Step 7: Use in Your SPA (5 mins)

### In your micro frontend project:

```bash
# Option A: Publish and install
npm publish
npm install @icap/ui-library

# Option B: Local development
npm link  # (in library)
npm link @icap/ui-library  # (in your SPA)
```

### Import in your SPA:

```typescript
// In main.tsx or App.tsx
import '@icap/ui-library/styles';
import { Button, Card, Alert } from '@icap/ui-library';

function App() {
  return (
    <div className="p-8 bg-gray-50">
      <Card>
        <Alert variant="success">✅ Library Working!</Alert>
        <Button variant="primary">Test Button</Button>
      </Card>
    </div>
  );
}
```

## 🎯 VS Code Extensions (Recommended)

Install these extensions for best experience:
- [ ] **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- [ ] **TypeScript Importer** (pmneo.tsimporter)  
- [ ] **Prettier** (esbenp.prettier-vscode)
- [ ] **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev          # Watch mode
npm run build        # Build library
npm run build:css    # Build CSS only

# Testing integration
npm link             # Create global link
npm unlink           # Remove global link
```

## 🔍 Troubleshooting Quick Fixes

### Build fails?
- [ ] Check all dependencies installed
- [ ] Verify tsconfig.json syntax
- [ ] Ensure all import paths are correct

### Tailwind not working in SPA?
- [ ] Verify `import '@icap/ui-library/styles';` in main file
- [ ] Check styles.css is generated in dist/
- [ ] Clear browser cache

### TypeScript errors?
- [ ] Run `npm run build` to generate type definitions
- [ ] Check all component exports in index files
- [ ] Verify peer dependencies in SPA

## 🎉 Success Indicators

You'll know it's working when:
- [ ] ✅ Build completes without errors
- [ ] ✅ `dist/` folder contains all output files
- [ ] ✅ SPA shows components with styling
- [ ] ✅ Tailwind classes work directly in SPA
- [ ] ✅ TypeScript autocomplete works for components

## 📞 Need Help?

1. **Check the implementation guide** → `IMPLEMENTATION_GUIDE.md`
2. **Review example usage** → `example-usage.md`
3. **Read full documentation** → `README.md`

---

**Total Estimated Time: ~40 minutes** ⏱️

Good luck! 🚀