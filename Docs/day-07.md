📅 Day 07 – Supabase Client Connection & Manual Insert
🎯 Objective

Connect the frontend application to Supabase using the official client and validate database insertion directly from the UI.

🛠 Work Completed

Created centralized Supabase client in /lib/supabase.ts

Configured environment variables using NEXT_PUBLIC_ prefix

Implemented service layer: residents.service.ts

Added test insertion button in ResidentsHeader

Validated successful insertion into PostgreSQL

Debugged foreign key constraint issue

Identified UUID requirement for center_id

🧠 Key Learnings

Supabase uses an auto-generated REST API over PostgreSQL

createClient() connects through Supabase API, not directly to the database

Environment variables must use NEXT_PUBLIC_ to be available in the browser

Foreign keys enforce strict referential integrity

UUID primary keys require matching UUID foreign keys

Frontend errors may not clearly show PostgreSQL constraint violations

🧱 Architecture Decisions

Use a centralized Supabase client (/lib/supabase.ts)

Implement feature-based service layer for database operations

Avoid direct database calls inside components

Maintain clean separation between UI and data logic

Keep RLS disabled until authentication phase (Week 4)

💡 Reflections

This day validated the real connection between frontend and database.
The foreign key error reinforced the importance of understanding data types and referential integrity.

The system now performs real database writes from the application layer.