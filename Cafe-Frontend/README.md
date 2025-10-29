# Fries & Buns

A modern, responsive fast-food ordering UI built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Browse categories, explore menu items, manage a cart, and proceed to a checkout flow.

> This repository is the codebase for the Fries & Buns project.

## Features
- Responsive layout with a polished UI using shadcn/ui (Radix primitives)
- SEO support via `react-helmet-async`
- Category filter and menu grid for quick discovery
- Cart context with add/update/remove operations
- Simple checkout flow scaffolding
- Reusable UI components and utilities

## Tech Stack
- React + TypeScript
- Vite
- React Router
- Tailwind CSS + tailwind-merge + tailwindcss-animate
- shadcn/ui + Radix UI
- React Hook Form + Zod (validation ready)
- TanStack Query (setup-ready for data fetching)

## Getting Started
### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm i
```

### Development
```bash
npm run dev
```
- Vite dev server will start and print a local URL.

### Build
```bash
npm run build
```
- Outputs production assets to `dist/`.

### Preview (serve the production build)
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Project Structure
```text
.
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ common/        # Hero, SEO
│  │  ├─ layout/        # Header, Footer
│  │  ├─ menu/          # CategoryFilter, MenuGrid
│  │  └─ ui/            # shadcn/ui components
│  ├─ context/          # CartContext
│  ├─ data/             # Menu data source
│  ├─ hooks/
│  ├─ lib/
│  ├─ pages/            # Cart, Checkout, Index, Menu, NotFound
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ tailwind.config.ts
├─ vite.config.ts
├─ tsconfig*.json
└─ eslint.config.js
```

## Available Scripts
- `dev`: Start the Vite development server
- `build`: Build for production
- `build:dev`: Development-mode build (useful for faster diagnostics)
- `preview`: Preview the production build locally
- `lint`: Run ESLint across the project

## Configuration
- Tailwind config: `tailwind.config.ts`
- PostCSS config: `postcss.config.js`
- ESLint config: `eslint.config.js`
- Vite config: `vite.config.ts`

## Assets & Screenshots
You can place screenshots or marketing images in `public/` or `src/assets/` and reference them here. For example:

```markdown
![Hero](./src/assets/hero-food-feast.jpg)
```

## Roadmap Ideas
- Persist cart to localStorage
- Integrate real backend APIs with TanStack Query
- Add authentication
- Add tests (unit and E2E)

## Contributing
Contributions are welcome! Feel free to open issues or pull requests.

## License
No license specified yet. If you intend to open-source, consider adding a `LICENSE` file (e.g., MIT).

## Acknowledgements
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
