# ChyDev Node.js Backend Boilerplate

A robust and secure Node.js backend boilerplate engineered by John Layda (ChyDev). This boilerplate provides a solid foundation for building scalable and secure REST APIs with TypeScript, Express, Redis, and more.

## Features

- **TypeScript**: Type-safe development with modern JavaScript features
- **Express.js**: Fast, unopinionated, minimalist web framework
- **Security Measures**:
  - Rate limiting
  - Secure cookies
  - Helmet security headers
  - XSS protection
  - Content Security Policy
  - CORS configuration
- **Redis Integration**: For caching and distributed rate limiting
- **Authentication**: Token-based authentication with encrypted payloads
- **Request Validation**: Using class-validator and class-transformer
- **Error Handling**: Consistent error responses across the application
- **Middleware**:
  - Authentication
  - Compression
  - CORS
  - Rate limiting
  - Role-based access control
  - Security headers
  - User agent parsing
- **Environment Configuration**: Development, production, and example configurations
- **API Response Format**: Standardized API response format
- **Production Ready**: Code obfuscation for production builds

## Prerequisites

- Node.js (v16+)
- npm, yarn, or pnpm
- Redis server (for caching and rate limiting)
- Database of your choice (configurable via DATABASE_URL)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Chysev/chydev-node-boilerplate
   cd chydev-node-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.dev
   # Edit .env.dev with your configuration values
   ```

## Environment Variables

Create a `.env.dev` file for development and `.env` for production with the following variables:

```
PORT=5000               # Application port
VERSION=v1              # API version
BASEROUTE=api           # Base API route

DATABASE_URL=           # Your database connection string
REDIS_URL=              # Redis connection string

ENC_KEY_SECRET=                # Encryption key (32-byte hex string)
CIPHER_KEY_SECRET=             # Cipher key (32-byte hex
string)
API_KEY_SECRET=                # (32-byte hex string)
API_KEY=                       # (JWT Token)
```

You can generate secure keys using the included utility:

```bash
ts-node src/gen/genSecretToken.ts
ts-node src/gen/genApiKey.ts
ts-node src/gen/genApiKeySecret.ts
```

## Project Structure

```
├── scripts/            # Build and utility scripts
├── src/
│   ├── config/         # Application configuration
│   ├── db/             # Database connections
│   │   └── redis.ts    # Redis connection
│   ├── gen/            # Generators
│   │   └── genSecretToken.ts  # Token generator
│   ├── lib/            # Core libraries
│   │   ├── api.ts      # API response formatter
│   │   ├── bcrypt.ts   # Password hashing
│   │   ├── cache.ts    # Caching utilities
│   │   ├── csrf.ts     # CSRF protection
│   │   ├── error.ts    # Error handling
│   │   └── token.ts    # Token management
│   ├── middleware/     # Express middleware
│   │   ├── auth.ts     # Authentication
│   │   ├── compression.ts  # Response compression
│   │   ├── cors.ts     # CORS configuration
│   │   ├── rateLimiter.ts  # Rate limiting
│   │   ├── roleGuard.ts    # Role-based access control
│   │   ├── securityHeaders.ts  # Security headers
│   │   └── userAgent.ts    # User agent parsing
│   ├── network/        # API implementation
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # Route definitions
│   │   └── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── validators/     # Input validation
│   ├── index.ts        # Express app setup
│   └── server.ts       # Server entry point
├── .env                # Production environment variables
├── .env.dev           # Development environment variables
└── .env.example       # Example environment variables
```

## Usage

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This starts the development server with hot-reload using ts-node-dev.

### Production Build

```bash
npm run build:production
# or
yarn build:production
# or
pnpm build:production
```

This compiles TypeScript to JavaScript, applies aliases, and obfuscates the code for production.

### Running in Production

```bash
npm run production
# or
yarn production
# or
pnpm production
```

## API Routes

The API routes follow the pattern:

```
/{BASEROUTE}/{VERSION}/...
```

For example, with default settings:

```
/api/v1/sample
```

## Extending the Boilerplate

### Adding New Routes

1. Create a new service in `src/network/services/`
2. Create a new controller in `src/network/controllers/`
3. Register your new route in `src/network/index.ts`

### Database Integration

The boilerplate is database-agnostic. Configure your preferred database client using the `DATABASE_URL` environment variable.

## Security Features

### Rate Limiting

Rate limiting is configured in `src/middleware/rateLimiter.ts`. In production, it uses Redis for distributed rate limiting across multiple server instances.

### Security Headers

Comprehensive security headers are set using Helmet and custom configurations in `src/middleware/securityHeaders.ts`.

## License

MIT

## Author

John Layda (ChyDev)
