# Architecture Document

## Overview
This repository uses a monorepo architecture managed by **Turborepo** and npm workspaces. It is designed to separate concerns across multiple internal packages and compose them into a host web application.

## Packages
- **`@sps/ui-components` (`packages/ui-components`)**: A library of reusable, stateless React components (Button, Card, Modal, etc.). It acts as the core design system and does not depend on any internal packages.
- **`@sps/utils` (`packages/utils`)**: A library of shared utilities (date formatting, ID generation, LocalStorage helpers). It is framework-agnostic and does not depend on any internal packages.
- **`@sps/feature-x` (`packages/feature-x`)**: The Task Planner feature module. It depends on `@sps/ui-components` for UI elements and `@sps/utils` for state persistence and ID generation.
- **`@sps/feature-y` (`packages/feature-y`)**: The Pomodoro Timer feature module. It depends on `@sps/ui-components` and `@sps/utils` for UI and timer formatting/storage.

## Applications
- **`web` (`apps/web`)**: The main host application built with Vite and React. It serves as an assembly layer. Its responsibilities are strictly limited to layout, navigation (using `react-router-dom`), and rendering the feature modules (`@sps/feature-x` and `@sps/feature-y`). It does not contain any feature-specific business logic.

## Dependency Rules
1. **Feature Isolation**: `feature-*` packages must not depend on each other.
2. **Core Independence**: `ui-components` and `utils` must not depend on any `feature-*` packages.
3. **App Assembly**: `apps/web` can depend on all packages but should avoid duplicating UI logic available in `ui-components` or feature logic available in `feature-*`.

## Build Pipeline
The `turbo.json` defines a task pipeline:
- `build`: Builds all workspace packages in topological order.
- `dev`: Starts development servers for applications.
- `lint` / `test`: Standard quality assurance scripts.
