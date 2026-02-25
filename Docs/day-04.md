📅 Day 04 – Routing & Modular Navigation
🎯 Objective

Implement nested routing structure inside the dashboard and enable functional sidebar navigation.

🛠 Work Completed

Created new routes:

/dashboard/residentes

/dashboard/medicaciones

/dashboard/pagos

Implemented nested folder-based routing using App Router

Verified layout persistence across child routes

Replaced static sidebar text with Link navigation

Enabled client-side navigation (SPA behavior)

Improved sidebar UX with hover styles

Fixed JSX syntax errors related to className

🧠 Key Learnings

Folder structure defines routing in Next.js App Router

Layout hierarchy determines UI inheritance

Link from next/link enables client-side navigation

Difference between HTML elements and Next components

Importance of correct JSX syntax

How layouts wrap nested routes using {children}

🧩 Architecture Decisions

Keep dashboard as modular parent route

Create feature-based subroutes inside dashboard

Maintain separation between layout and page logic

Prepare foundation for role-based routing in future implementation

💡 Reflections

Successfully implemented SPA-style navigation without page reloads.
Understood layout inheritance behavior in nested routing.
Improved confidence in project structure and frontend scalability.