# cIV - Single Page Product Website

A modern, dynamic single-page product website built with Next.js 15, TypeScript, Tailwind CSS, and Sanity CMS integration.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **CMS**: Sanity CMS
- **Environment**: Doppler (client-managed)
- **Deployment**: Vercel
- **Version Control**: Git with GitHub Actions

## 📁 Project Structure

```
cIV/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   └── ui/            # Shadcn UI components
│   ├── lib/               # Utility functions
│   │   └── utils.ts       # Tailwind utilities
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Additional styles
│   └── config/            # Configuration files
├── public/                # Static assets
└── ...config files
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cIV
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Environment variables are managed via Doppler (client-managed)
   - Contact your team lead for access to environment configurations

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development Workflow

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS**: Utility-first styling approach

### Git Workflow

This project follows a three-branch strategy:

- `main` - Production-ready code
- `staging` - Pre-production testing
- `development` - Active development

**Branch Protection Rules:**

- Direct pushes to `main` and `staging` are blocked
- All changes must go through Pull Requests
- Required: Code review approval
- Required: All CI checks must pass

### CI/CD Pipeline

GitHub Actions workflows automatically:

- Run ESLint and TypeScript checks
- Format code with Prettier
- Build the application
- Run unit tests
- Analyze bundle size

## 🎨 UI Components

This project uses Shadcn UI components built on top of Radix UI primitives:

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

### Available Components

- Button (already installed)
- More components can be added as needed

## 📱 Pages Structure

The website consists of three main pages:

1. **Splash Screen** - Initial loading/welcome screen
2. **Landing Page** - Main product showcase
3. **Blog Page** - Blog posts and micro-writing content

All content is dynamically managed through Sanity CMS.

## 🔒 Environment Management

- **Production**: Managed via Doppler
- **Development**: Local environment setup
- **Staging**: Pre-production environment

Environment variables are client-managed through Doppler for security and consistency.

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from:

- `main` branch → Production
- `staging` branch → Staging environment
- `development` branch → Development preview

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Create a feature branch from `development`
2. Make your changes
3. Run tests and linting
4. Submit a Pull Request to `development`
5. After review and approval, merge to `development`

## 📝 Notes

- All content is managed through Sanity CMS
- Real-time preview functionality is available
- Design implementation follows provided client specifications
- Mobile-first responsive design approach

## 🐛 Issues and Support

For issues, bugs, or feature requests, please create an issue in the project repository or contact the development team.

---

**Last Updated**: December 2024
**Version**: 0.1.0
