# Lead Extractor SaaS

![License](https://img.shields.io/badge/license-Proprietary-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)

An enterprise-grade, Series-A ready Lead Extraction platform built to manage and enrich millions of targets with high performance and AI-ready architecture.

## 🚀 Tech Stack

- **Framework**: [Next.js 14 App Router](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL via [Supabase](https://supabase.com/) / Prisma
- **State Management**: Zustand
- **Icons**: Lucide React

## 📂 Architecture Overview

The codebase is structured to scale cleanly as the team grows:

* `app/`: Next.js App Router structure (Routes, Layouts, API endpoints).
* `components/`: Modular React components (UI, Layout, Dashboard, Forms).
* `services/`: Core business logic abstraction `[Domain]Service.ts`.
* `lib/`: Utility functions and third-party initializations (e.g., Supabase client).
* `store/`: Zustand global state slices.
* `types/`: Comprehensive TypeScript interfaces for Models and API responses.
* `constants/`: System-wide static data (Roles, Configurations).

## 💻 Local Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:your-org/lead-extractor.git
   cd lead-extractor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Make a copy of `.env.example` to `.env.local` and add your database keys:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤝 Contribution Guidelines

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for strict guidelines on branch naming, PR processes, and codebase standards. We enforce a high bar for code quality.

## 🔒 Security & AI Readiness

This platform is structured to immediately intercept AI agents and ML models via the `services/` layer, ensuring safe, abstracted execution of LLM-generated operations without compromising UI stability or Database integrity. All roles follow strict zero-trust parameters.

---

*Property of Ideanix © 2026. Confidential.*
# Lead-Extractor
# lead-extractor
