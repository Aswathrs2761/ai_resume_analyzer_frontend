# AI Resume Analyzer (Frontend)

This repository contains the **frontend** for the AI Resume Analyzer application. It's built with React and Vite, and styled using Tailwind CSS with dark‑mode support. The UI provides authentication, resume upload, history, and detailed analysis result views.

## Features

- Responsive layout with sidebar/navigation
- Authentication flows (sign in, sign up, forgot/reset password)
- Drag‑and‑drop PDF resume upload
- Dashboard showing stats and recent analyses
- Detailed analysis results with score, skills, suggestions, summary
- Light / dark theme toggle
- Mobile-friendly sidebar with hamburger toggle

> Note: this project assumes a backend API exists at `/auth` and `/resume` endpoints.

## Getting Started

### Prerequisites

- Node.js (>=16) and npm or yarn

### Installation

```bash
# clone frontend
git clone <repo-url> frontend_ai_resume_analyzer/ai_resume_analyzer
cd frontend_ai_resume_analyzer/ai_resume_analyzer

# install dependencies
npm install
# or yarn
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port shown by Vite).

### Building for production

```
npm run build
```

Output is written to `dist/` and can be served with any static hosting provider.

### Environment variables

Add a `.env` file to the project root if you need to override the API base URL:

```
VITE_API_BASE_URL=https://api.example.com
```

(Defaults to same origin if not set.)

## Project Structure

```
src/
  api/axios.js        # axios instance with auth header
  components/         # shared UI components (Navbar, Sidebar, AuthLayout...)
  layouts/            # layout wrappers (DashboardLayout)
  pages/              # route pages (Login, Dashboard, AnalysisResult, etc.)
  context/            # theme & auth contexts
  hooks/              # custom hooks (useTheme)
  utils/              # constants, helpers
  index.css           # global styles
  main.jsx            # entrypoint
```

## Styling

Tailwind CSS handles styling. Dark mode is configured using the `dark` class on `<html>` via `ThemeContext`.

## Contribution

Feel free to open issues or PRs. This project is intended as a boilerplate for AI‑driven resume analysis applications.

## License

Aswath
