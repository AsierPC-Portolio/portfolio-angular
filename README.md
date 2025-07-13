

# Portfolio Angular

> **Professional, portable, and scalable frontend**

---


## 🚀 Main Features

- **Angular 17+ Standalone**: Modular, modern architecture.
- **Tailwind CSS**: Modern, customizable utility-first CSS.
- **Internationalization (i18n)**: Multi-language support with `@ngx-translate` and dynamic loading.
- **Storybook**: Visual documentation and component testing.
- **Testing**: Ready for unit and e2e tests.
- **OpenAPI Generator**: Angular models and services auto-generated from your backend.
- **Clean root**: Configuration files organized for maximum clarity.
- **SVG Icons with @ng-icons/heroicons**: Professional, consistent icons for Angular (Heroicons set, easy to use and portable).

## 📦 Folder Structure

```
├── src/
│   ├── app/
│   │   ├── api/         # Generated models & services (OpenAPI)
│   │   ├── core/        # Singleton services, guards, interceptors
│   │   ├── shared/      # Reusable components, pipes, utilities
│   │   └── features/    # Feature modules
│   ├── assets/
│   └── styles.scss      # Imports Tailwind & global styles
├── tailwind.config.js   # Tailwind config (root)
├── postcss.config.js    # PostCSS config (root)
├── angular.json         # Angular CLI config
├── package.json
└── ...
```

---

## 🛠️ Useful Commands

### Development

```bash
npm install         # Install dependencies
ng serve            # Dev server (http://localhost:4200)
```

### Build & Production

```bash
ng build            # Build for production in /dist
```

### Lint & Format

```bash
npm run lint        # Lint with ESLint (config in /config)
npm run format      # Format with Prettier
```

### Storybook

```bash
npm run storybook           # Visualize & document components
npm run build-storybook     # Static Storybook build
```

### OpenAPI Auto-generation

```bash
npm run api:all     # Clean, generate, and post-process models/services from OpenAPI
```

---

## 🌐 Internationalization (i18n)
- Configured with `@ngx-translate/core` and dynamic JSON loading.
- Easily extendable for new languages.

## 🎨 Tailwind CSS
- Config in `tailwind.config.js` and `postcss.config.js` (root).
- Use utility classes directly in Angular templates.

## 📚 Storybook
- Document and visually test components in isolation.
- Access: `npm run storybook` and go to `http://localhost:6006`

## 🔄 OpenAPI Generation
- Angular models and services auto-generated from your backend OpenAPI.
- Config in `/config/openapi-generator.config.json`.

## 🖼️ Icons
- This project uses [@ng-icons/heroicons](https://ng-icons.github.io/ng-icons/) for SVG icons (Heroicons set, open source, portable to React, etc).

## 🧹 Best Practices
- Clean root: only global and essential config files.
- All OpenAPI-generated code is lint-ignored and isolated in `/src/app/api`.
- ESLint & Prettier configured for consistent code.

---

## 📖 More Info
- [Angular CLI Docs](https://angular.dev/tools/cli)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation)
- [Storybook Angular](https://storybook.js.org/docs/angular/get-started/introduction)
- [OpenAPI Generator](https://openapi-generator.tech/docs/generators/typescript-angular/)

---

> Project maintained with ❤️ and best practices.
