# Day 05 – Modular Architecture & Client Components

## 📚 Learning (2h)

Today I learned:

- The difference between Server Components and Client Components in Next.js (App Router).
- Why hooks like `useState` only work inside Client Components.
- How and when to use the `"use client"` directive.
- Modular architecture separation:
  - `app/` → routing and navigation
  - `modules/` → domain logic
- Responsibility separation:
  - components → UI
  - hooks → React state logic
  - services → data access layer (structure prepared)

## 🏗 Implementation (3h)

Implemented:

- Created `modules/` folder
- Created `residents` module
- Added custom hook `useResidents`
- Created `ResidentsHeader` component
- Proper integration between:
  - `page.tsx` (Server Component)
  - `ResidentsHeader` (Client Component)
  - `useResidents` (Client hook)

## 🧠 Key Concepts Understood

- Server Components can render Client Components.
- Client Components can use hooks.
- Hooks cannot run inside Server Components.
- Clear separation between navigation and domain logic.
- Feature-based architecture for scalability.

## 🚀 Current Project Structure

Architecture prepared for database integration and scalable growth.