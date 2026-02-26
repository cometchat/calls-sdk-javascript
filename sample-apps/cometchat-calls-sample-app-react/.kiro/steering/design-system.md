---
inclusion: always
---

# Design System Rules

## Project Overview
- React 19 + TypeScript app built with Vite
- App name: cometchat-calls-sample-app-react

## Styling Approach
- CSS Modules (`.module.css`) for component-scoped styles
- Global styles in `src/index.css`
- No Tailwind or CSS-in-JS — use plain CSS with CSS Modules
- When translating Figma designs, convert Tailwind utility classes to CSS Module classes

## Design Tokens

### Typography
```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
```

### Layout
- Minimum width: 320px
- Full viewport height: min-height 100vh
- No margin on body

## Component Architecture
- Functional components (no class components)
- Default exports for page components
- CSS Module import pattern: `import styles from './ComponentName.module.css'`
- Components use `styles.container` as root wrapper class

### File Organization
```
src/
  pages/
    <feature-name>/
      FeatureName.tsx          # Component file
      FeatureName.module.css   # Scoped styles
  assets/                      # Static assets
  App.tsx                      # Root component
  index.css                    # Global styles
```

## Figma-to-Code Guidelines
- Replace Tailwind classes from Figma MCP output with CSS Module classes
- Define colors, spacing, and typography as CSS custom properties in `:root` when reusable
- Use semantic class names that describe purpose, not appearance
- Keep component styles co-located in `.module.css` files
- Reuse existing components before creating new ones
- Maintain 1:1 visual parity with Figma designs
- Download and place image/icon assets in `src/assets/`
