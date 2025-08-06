# Back to the Future Quiz Game

## Overview

This is an interactive quiz game themed around the "Back to the Future" movie franchise. The game features a spinning wheel team selector, mystery boxes for time period selection, and trivia questions from three different eras (1885 Wild West, 1985 Present, and 2015 Future). Built as a full-stack TypeScript application with React frontend and Express backend, it includes immersive audio effects, 3D graphics capabilities, and a modern UI component library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **UI Components**: Comprehensive shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming and animations
- **3D Graphics**: React Three Fiber ecosystem (@react-three/fiber, @react-three/drei, @react-three/postprocessing) for potential 3D elements
- **State Management**: Zustand stores for game state and audio management
- **Data Fetching**: TanStack Query for server state management
- **Asset Support**: GLSL shaders, 3D models (GLTF/GLB), and audio files (MP3/OGG/WAV)

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: Hot reloading with Vite integration in development mode
- **Storage**: Pluggable storage interface with in-memory implementation (MemStorage class)
- **API Design**: RESTful API structure with /api prefix routing
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Game Logic Architecture
- **Game Flow**: Three-phase game state machine (wheel → mystery boxes → question display)
- **Team Management**: Dynamic team selection with removal after selection to prevent duplicates
- **Question System**: Time-period based question banks with random selection and question depletion tracking
- **Audio System**: Centralized audio management with background music, sound effects, and mute functionality

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless database with connection pooling
- **Migrations**: Drizzle Kit for schema migrations and database management
- **Schema**: Shared TypeScript schema definitions between client and server
- **Validation**: Zod schema validation for runtime type checking

### Development Architecture
- **Monorepo Structure**: Client, server, and shared code in organized directories
- **Path Aliases**: TypeScript path mapping for clean imports (@/ for client, @shared for shared code)
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)
- **Development Experience**: Runtime error overlay and comprehensive TypeScript configuration

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with automatic TypeScript generation
- **Drizzle Kit**: Database migration and introspection tools

### Frontend Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for complex components
- **React Three Fiber**: React renderer for Three.js enabling 3D graphics and animations
- **Zustand**: Lightweight state management without boilerplate
- **TanStack Query**: Powerful data synchronization for server state management
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing

### Development Tools
- **Vite**: Fast development server with HMR and optimized production builds
- **TypeScript**: Static type checking with strict configuration
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

### Audio & Media
- **Web Audio API**: Native browser audio management for sound effects and background music
- **Asset Pipeline**: Support for various media formats including 3D models and audio files

### Styling & Animation
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **CSS Animations**: Custom keyframe animations for game elements (spinning wheel, glowing effects)
- **Responsive Design**: Mobile-first responsive design patterns