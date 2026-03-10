# 📅 Day 08 - Create Resident Form

## 🎯 Objective

Implement a controlled form to create new residents and connect it to the Supabase database.

## 🛠 Work Completed

Created ResidentForm component

Implemented controlled inputs using useState

Added validation for required fields

Connected form submission to residents.service

Inserted residents dynamically into Supabase

Cleared form fields after successful submission

Implemented page reload to refresh resident count

## 🧠 Key Learnings

Understanding controlled forms in React

Managing form state with useState

Using preventDefault in form submission

Basic form validation

Connecting UI forms to backend services

## 🧱 Architecture Decisions

Keep database calls inside service layer

Maintain separation between UI and data logic

Use feature-based architecture inside modules

Use temporary page reload until reactive fetching is implemented

## 💡 Reflections

The system now supports real CRUD creation from the interface.  
The form interacts directly with Supabase through a clean service layer, reinforcing the modular architecture.