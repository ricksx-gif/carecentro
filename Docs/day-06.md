# Day 06 – Database Modeling (Supabase)

## 📚 Learning (2h)

Today I studied:

- Relational database fundamentals.
- Tables, rows, columns.
- Primary Keys and Foreign Keys.
- Multi-tenant architecture principles.
- Why derived values (like age) should not be stored.
- Basic CRUD concepts in database systems.

Resources reviewed:
- https://www.w3schools.com/sql/
- https://www.w3schools.com/sql/sql_primarykey.asp
- https://supabase.com/docs/guides/database

---

## 🏗 Implementation (3h)

Implemented:

- Created `centers` table:
  - id (uuid, primary key)
  - name (text, not null)
  - created_at (timestamp with timezone, default now())

- Created `residents` table:
  - id (uuid, primary key)
  - center_id (uuid, foreign key → centers.id)
  - name (text, not null)
  - birth_date (date, not null)
  - created_at (timestamp with timezone, default now())

- Configured foreign key relationship.
- Inserted test center.
- Inserted test resident linked to center.
- Verified referential integrity.

---

## 🧠 Key Concepts Understood

- Proper multi-tenant data modeling.
- Referential integrity enforcement.
- Importance of designing schema before writing business logic.
- Separation between data modeling and application logic.

---

## 🚀 Current System State

CareCentro now has a structured relational database design in Supabase.
Tables are properly connected and ready for application integration.