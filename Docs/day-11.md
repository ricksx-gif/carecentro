Day 11 — Medications Data Model & Resident Relationship
🎯 Objective

Design and implement the medications data model and establish a relationship between residents and their medications in the CareCentro system.

This prepares the foundation for managing medical treatments assigned to each resident.

🛠 Work Completed

Created the medications table in Supabase.

Defined the following columns:

id (uuid, primary key)

resident_id (uuid, foreign key)

name (text)

dose (text)

schedule (text)

created_at (timestamp)

Linked medications to residents using a foreign key relationship:

medications.resident_id → residents.id

Configured gen_random_uuid() as the default value for the id field.

Ensured that each medication record belongs to a specific resident.

Prepared the database structure required to implement the medications module.

🧠 Key Learnings

How to design relational data models for healthcare records.

How to create foreign key relationships in Supabase.

Understanding one-to-many relationships between tables.

Designing tables that support future modules and features.

Planning database schemas before implementing application logic.

🧩 Architecture Decisions

Keep medication records in a separate table instead of embedding them inside residents.

Use a foreign key (resident_id) to maintain referential integrity.

Design the schema to support multiple medications per resident.

Keep the structure flexible to allow future features such as:

medication history

dosage updates

medication reminders

reporting and analytics

💡 Reflections

The medications data model establishes the first medical-related feature in the system.

Linking medications to residents introduces a more realistic healthcare data structure.

This milestone prepares the system for implementing the full medications CRUD module in the next step.

The database schema is now scalable and ready for future healthcare management features.