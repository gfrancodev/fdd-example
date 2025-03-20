# Feature Driven Design with Dependency Injection

A modern React application demonstrating the implementation of Feature Driven Design (FDD) architecture with Dependency Injection (DI) using the @brushy/di library.

## Project Overview

This project is a task management application that showcases how to structure a React application using Feature Driven Design principles, combined with Dependency Injection to achieve highly decoupled, maintainable, and testable code.

### Key Features

- **Task organization**: Create and manage task groups
- **Task management**: Add, complete, and delete tasks
- **Interactive onboarding**: Guided experience for new users
- **Clean architecture**: Clear separation of concerns

## Architecture

The application follows a Feature Driven Design approach where code is organized around features rather than technical layers. This creates a more intuitive structure that mirrors the business domain.

### Core Technologies

- **React**: UI library
- **@brushy/di**: Dependency injection for React
- **@brushy/localstorage**: Type-safe localStorage wrapper with TTL support
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Application routing

### Project Structure

```
src/
├── app/              # Application composition
├── core/             # Shared functionality
│   ├── @types/       # Core type definitions
│   ├── components/   # Shared UI components
│   ├── hooks/        # Shared hooks
│   ├── styles/       # Global styles
│   ├── utils/        # Utility functions
│   └── index.ts      # Public API
├── feature/          # Business features
│   └── task/         # Task management feature
│       ├── components/   # Task-specific components
│       ├── hooks/        # Task-specific hooks
│       ├── services/     # Task-specific services
│       ├── index.ts      # Feature's public API
│       ├── task.context.tsx  # Feature state management
│       └── task.d.ts    # Feature type definitions
├── app.tsx           # Application root
└── main.tsx          # Entry point
```

## Key Architectural Concepts

1. **Feature Isolation**: Each feature encapsulates everything needed for a specific business functionality
2. **Dependency Injection**: Components depend on abstractions rather than concrete implementations
3. **Component Inversion**: UI components can be injected and replaced without changing business logic
4. **Clear Contracts**: Type definitions establish clear interfaces between components
5. **Centralized Type Definitions**: All component interfaces are defined in central declaration files (`core.d.ts` and feature-specific `.d.ts` files) using TypeScript namespaces, ensuring consistent typing across the application

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Author: Gustavo Franco ([gfranocdev](https://github.com/gfranocdev))
