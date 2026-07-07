# Innovate AI Backend

A TypeScript Express.js backend API for the Innovate AI platform.

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the template:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

```
src/
├── index.ts          # Main application entry point
└── ...               # Additional modules

dist/                 # Compiled JavaScript output
tests/                # Test files
package.json          # Dependencies and scripts
tsconfig.json         # TypeScript configuration
.env.example          # Environment variables template
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check

## Configuration

Environment variables are configured in `.env`. See `.env.example` for available options:
- `NODE_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level

## Development

This project uses TypeScript with strict mode enabled. All source files should be in the `src/` directory and will be compiled to the `dist/` directory.

### Building

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## License

ISC
