# 📅 Day 09 — Residents READ & Reactive Updates

## 🎯 Objective

Implement the **READ functionality for residents** and make the UI reactive without page reloads.

---

## 🛠 Work Completed

Created a custom hook to fetch residents from Supabase:

```
modules/residents/hooks/useResidents.ts
```

The hook:

* Fetches residents from Supabase
* Stores them in React state
* Exposes a refetch function to update data

```
useResidents()
```

---

Created a table component to display residents:

```
modules/residents/components/ResidentsTable.tsx
```

The table displays:

* Resident name
* Birth date

---

Connected the hook to the dashboard:

```
ResidentsHeader.tsx
```

Responsibilities:

* Fetch residents
* Display resident count
* Render the form
* Render the table

---

Implemented **lifting state up**.

State is managed in the parent component:

```
ResidentsHeader
```

and passed to children:

```
ResidentForm
ResidentsTable
```

---

Removed page reload behavior:

Before:

```
window.location.reload()
```

Now:

```
insertResidentTest()
↓
fetchResidents()
↓
setResidents()
↓
React re-render
```

The table updates automatically without refreshing the page.

---

## 🧠 Key Learnings

Understanding of **React data flow**.

Parent component manages state and shares it with children.

Concept learned:

```
Lifting State Up
```

React hooks can create independent states, so state must live in a single source of truth.

---

## 🧱 Architecture Implemented

```
Supabase
   ↓
residents.service.ts
   ↓
useResidents hook
   ↓
ResidentsHeader
   ↓
ResidentForm + ResidentsTable
```

This structure keeps **data logic separated from UI components**.

---

## 🧩 Current Module Capabilities

Residents module now supports:

```
CREATE ✔
READ ✔
Reactive UI ✔
```

Residents can be created and immediately appear in the table without reloading the page.

---

## 💡 Reflections

This day reinforced understanding of:

* React hooks
* State management
* Component communication
* Clean modular architecture

The residents module now behaves like a **real SaaS dashboard component**.
