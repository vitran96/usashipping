# TypeScript Migration Guide

This document provides information about the migration from JavaScript to TypeScript for the USAShipping project.

## Overview

The USAShipping project has been successfully migrated from JavaScript (JSX) to TypeScript (TSX). The migration includes:

- Setting up TypeScript configuration
- Converting React components to use TypeScript
- Adding type definitions for component props and EverShop framework types
- Updating build scripts to handle TypeScript compilation

## Project Structure

The project now uses the following TypeScript configuration:

- `tsconfig.json` at the root of the project defines TypeScript compilation options
- Type definitions for EverShop components in `themes/types/evershop.d.ts`
- All React components converted to use `.tsx` extension with proper typing

## Key Type Definitions

### Common Interfaces

#### ComponentLayout
Used for EverShop layout configuration objects:
```typescript
interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}
```

#### Product 
```typescript
interface Product {
  productId: number;
  name: string;
  price: {
    regular: {
      value: number;
      text: string;
    };
    special: {
      value: number;
      text: string;
    };
  };
  image: {
    alt: string;
    url: string;
  };
  url: string;
}
```

#### Component-specific props
Each component has its own interface defined for its props, for example:
```typescript
interface CartProps {
  cart: {
    totalQty?: number;
    items: CartItem[];
    // ...other properties
  };
}
```

## Development Workflow

### Adding New Components

When adding new components:

1. Create files with `.tsx` extension
2. Define interfaces for component props
3. Use React.FC<PropType> typing for functional components
4. Properly type any hooks or state variables

Example:
```typescript
interface MyComponentProps {
  title: string;
  items: Array<{ id: number; name: string }>;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, items }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Component implementation
}
```

### Working with EverShop Framework

When using EverShop-specific features:

- Use the type definitions from `themes/types/evershop.d.ts`
- Add new type definitions as needed when using new components from the framework
- Type the layout and query exports properly

## Build Process

The build process has been updated in package.json:

- `npm run build` now runs TypeScript compilation before the EverShop build
- `npm run type-check` performs TypeScript type checking without emitting files

## Future Considerations

As the project evolves, consider:

1. Adding more specific types for GraphQL queries
2. Creating utility types for common patterns
3. Enhancing type safety for the EverShop framework integration
4. Setting up ESLint with TypeScript rules