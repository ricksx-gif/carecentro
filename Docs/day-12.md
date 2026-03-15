# Day 12 — Medications Module & Full CRUD

## 🎯 Objective

Implement the medications module linked to residents and complete the full CRUD cycle for medication management.

---

## 🛠 Work Completed

Created medications module using feature-based architecture.

Implemented medication creation through MedicationForm component.

Connected medication creation to Supabase using insertMedication() service.

Linked medications to residents using resident_id foreign key.

Implemented medications listing in MedicationsList component.

Fetched medications from Supabase using getMedicationsByResident().

Added delete functionality using deleteMedication() service.

Connected delete action to UI button in MedicationsList.

Ensured medications refresh automatically after create and delete operations.

Lifted medication state management to the page level using useMedications hook.

Passed actions and state to components via props for better separation of concerns.

Maintained consistent table styling with borders and layout.

Completed full CRUD operations for the medications module.

---

## 🧠 Key Learnings

How to structure a feature module using components, hooks, services, and types.

How to link database entities using foreign keys (resident_id).

How to implement CRUD operations with Supabase.

How to manage shared state across components using custom hooks.

How to pass functions and state through props to maintain a clean architecture.

How to refresh UI state after database mutations.

---

## 🧩 Architecture Decisions

Keep database interactions inside the services layer.

Use custom hooks (useMedications) to manage state and business logic.

Separate UI components (MedicationForm and MedicationsList) from data logic.

Centralize medication state management at the page level.

Maintain feature-based architecture for scalability.

---

## 💡 Reflections

The medications module is now fully functional and connected to residents.

The system now supports creating, viewing, and deleting medications without reloading the page.

This milestone establishes a scalable structure for adding future healthcare-related features such as medication schedules, reminders, or administration tracking.