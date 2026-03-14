# Day 10 – Delete Residents & Full CRUD

## 🎯 Objective

Implement the ability to delete residents from the system and complete the CRUD cycle for the residents module.

---

## 🛠 Work Completed

Added delete functionality to the residents module.

Created deleteResident() function in residents.service.ts.

Connected the delete operation to Supabase.

Added delete button in ResidentsTable component.

Implemented confirmation dialog before deleting a resident.

Triggered fetchResidents() after deletion to refresh the table without reloading the page.

Improved table styling with consistent borders.

Completed full CRUD operations for the residents module.

---

## 🧠 Key Learnings

How to implement DELETE operations using Supabase.

How to connect UI actions with database operations.

How to refresh React state after a database mutation.

Passing functions between React components through props.

Handling confirmation dialogs before destructive actions.

---

## 🧩 Architecture Decisions

Keep database logic inside the services layer.

Use hooks to manage resident state and data fetching.

Allow components to trigger data refresh through fetchResidents().

Maintain feature-based architecture for scalability.

---

## 💡 Reflections

The residents module now supports the complete CRUD cycle.

The UI updates reactively without requiring a full page reload, improving user experience.

This milestone makes the residents module behave like a real SaaS feature ready for future expansion.
