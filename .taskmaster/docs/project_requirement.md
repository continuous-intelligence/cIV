## Project Overview

Development of a single-page product website with dynamic content management capabilities using Sanity CMS, allowing management to update website content without code modifications.

## Technical Stack

- **Frontend Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn
- **Content Management System:** Sanity
- **Environment Management:** Doppler (client-managed)
- **Version Control:** Git
- **CI/CD:** GitHub Actions

## Pages Required

1. **Splash Screen**
2. **Landing Page**
3. **Blog Page**

## Functional Requirements

### Content Management

- All website content must be fully dynamic and manageable through Sanity CMS
- Content changes in Sanity must automatically reflect on the website without code modifications
- Support for both blog posts and micro-writing content
- Management should be able to update any section of the website through Sanity

### Frontend Integration

- Seamless integration between Next.js frontend and Sanity backend
- Real-time content rendering from Sanity to the website
- Implementation based on provided design images

### Authentication

- No authentication system required
- No login functionality
- No protected content

## Version Control & CI/CD Requirements

### Git Branching Strategy

- **Three main branches:**
  - `main` - Production branch (protected)
  - `staging` - Staging environment branch (protected)
  - `development` - Active development branch
- All feature development happens in feature branches created from `development`
- Pull requests required for merging into any of the main branches

### GitHub Actions Workflow

- **Automated checks on every commit to `development` branch:**
  - ESLint for code linting
  - TypeScript type checking
  - Prettier formatting check
  - Build verification
  - Unit tests (if applicable)
  - Bundle size analysis
- Workflows run only on the `development` branch
- All checks must pass before merging to `staging` or `main`

### Branch Protection Rules

- **Protected branches:** `main` and `staging`
- **Protection rules:**
  - Require pull request reviews before merging
  - Require status checks to pass before merging
  - Dismiss stale pull request approvals when new commits are pushed
  - Require branches to be up to date before merging
  - Include administrators in restrictions
  - Prevent force pushes and deletions

### Deployment Pipeline

- `development` → Manual promotion to → `staging` → Manual promotion to → `main`
- Automated deployments:
  - `main` branch deploys to production
  - `staging` branch deploys to staging environment
  - `development` branch for preview deployments

## Deliverables

- Fully functional website with three pages (Splash, Landing, Blog)
- Sanity CMS integration with complete content management setup
- Dynamic content rendering implementation
- Frontend implementation matching provided design images
- Git repository with proper branching strategy
- GitHub Actions workflows for automated testing and quality checks
- Documentation for Git workflow and deployment process

## Notes

- Doppler integration will be handled by the client
- Design images will be provided by the client
- GitHub repository setup and branch protection configuration required during initial setup
