# Student Productivity Suite

A monorepo containing a suite of productivity tools for students, built with Turborepo, Vite, and React.

## Workspace Structure

- `apps/web`: The main React host application (Vite).
- `packages/feature-x`: Task Planner module.
- `packages/feature-y`: Pomodoro Timer module.
- `packages/ui-components`: Reusable UI primitives.
- `packages/utils`: Shared helper functions.

## Installation

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```

## Development

To start the development server for all apps and packages:
```bash
npm run dev
```
Then open `http://localhost:5173` in your browser.

## Build

To build all apps and packages:
```bash
npm run build
```
