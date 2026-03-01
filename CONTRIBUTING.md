# Contributing to Lead Extractor SaaS

Welcome to the team! Our primary goal is to maintain a pristine, highly-scalable, and predictable codebase. As an intern or junior engineer, you are expected to read and follow these rules strictly.

## 1. Branch Strategy

We use a feature-branch workflow. **NEVER** commit directly to `main` or `develop`.

Format your branch names correctly:
- `feature/[ticket-id]-short-description` (e.g., `feature/LEAD-12-add-export-csv`)
- `fix/[ticket-id]-short-description` (e.g., `fix/LEAD-44-login-hydration-error`)
- `chore/[short-description]` (e.g., `chore/update-dependencies`)

## 2. Pull Request Rules

1. **Title**: Start with the Ticket ID, e.g., `[LEAD-12] Add export to CSV on leads table`.
2. **Description**: Clearly explain *what* you changed and *why*. Tag any relevant team members.
3. **Size**: Keep PRs small and focused. If a PR touches more than 15 files, it is likely too large and should be broken down.
4. **Review**: You need at least 1 approval from a Senior Engineer before merging.
5. **No Errors**: Your code must pass `npm run type-check` and `npm run lint` without any warnings.

## 3. Naming Conventions

- **Files & Folders**: Use `kebab-case` for general files (e.g., `lead-table.tsx`), but components should export `PascalCase` names. Services should be `[domain].service.ts` (e.g., `user.service.ts`).
- **Interfaces / Types**: Use `PascalCase`. Do not prefix with `I` (e.g., `User` not `IUser`).
- **Variables / Functions**: Use `camelCase`. Function names should be descriptive action verbs (e.g., `fetchActiveLeads`, not `getLeads`).
- **Constants**: Use `UPPER_SNAKE_CASE` for global constants (e.g., `MAX_RETRY_COUNT`).

## 4. Folder Responsibility (Crucial!)

To ensure scalability, we strictly separate concerns:

- **UI Components (`/components`)**: Should be "dumb" whenever possible. They take props and render UI. They should *not* make direct database calls.
- **Pages (`/app`)**: Responsible for routing and composing components.
- **Business Logic (`/services`)**: All database interaction, external API calls, and complex data formatting MUST live here. If a component needs to fetch data, it calls a service. 
- **Types (`/types`)**: If you create a new data structure, it must be typed here. `any` is strictly prohibited in new code.

## 5. Styling Guidelines

- We use Tailwind CSS. Rely on the `cn()` utility from `lib/utils` for conditional classes.
- Use `shadcn/ui` components for standard elements (Buttons, Inputs, Dialogs). Do not build custom interactive elements if a shadcn equivalent exists.
- Be consistent with our dark motif. Use slate and indigo variables appropriately.

**Failure to adhere to these guidelines during PR review will resulting in an immediate request for changes.**

Thank you for helping us build a world-class product!
