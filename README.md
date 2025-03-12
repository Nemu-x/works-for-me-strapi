# Works For Me - FAQ Portal

A modern FAQ portal built with Next.js and Strapi CMS, designed to help teams manage and share knowledge effectively.

## Project Structure

The project consists of two main parts:

- `web-app`: Next.js frontend application
- `web-cms`: Strapi CMS backend

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- PostgreSQL (for Strapi CMS)

## Getting Started

1. Clone the repository:
<<<<<<< HEAD
```bash
git clone https://github.com/Nemu-x/works-for-me-strapi.git
```
=======
   ```bash
   git clone https://github.com/Nemu-x/works-for-me-strapi.git
   cd works-for-me-strapi
   ```
>>>>>>> bed39be (feat: setup monorepo structure with web-app and web-cms)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `web-app` and `web-cms` directories
   - Update the variables according to your environment

4. Start development servers:
   ```bash
   npm run dev
   ```
   This will start both the Next.js app (http://localhost:3000) and Strapi CMS (http://localhost:1337)

## Development

- Frontend (web-app): http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

### Available Scripts

- `npm run dev` - Start both frontend and CMS in development mode
- `npm run build` - Build both applications for production
- `npm run start` - Start both applications in production mode

### Individual Commands

Frontend (web-app):
- `npm run dev:app` - Start frontend in development mode
- `npm run build:app` - Build frontend for production
- `npm run start:app` - Start frontend in production mode

CMS (web-cms):
- `npm run dev:cms` - Start Strapi in development mode
- `npm run build:cms` - Build Strapi for production
- `npm run start:cms` - Start Strapi in production mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
