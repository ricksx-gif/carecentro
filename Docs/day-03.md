📅 Day 03 – State Management & Reactivity
🎯 Objective

Introduce React state using useState and implement interactive dashboard behavior.

🛠 Work Completed

Converted static variables into React state using useState

Added "use client" directive to enable client-side interactivity

Implemented functional state updates

Created interactive buttons:

Increase residents (+1)

Decrease residents (-1)

Added conditional logic to prevent negative values

Verified real-time re-render behavior in the browser

🧠 Key Learnings

Difference between normal variables and React state

How useState preserves values between renders

React batching behavior

Importance of functional updates when state depends on previous value

Event handling with onClick

Conditional rendering logic using ternary operators

🧩 Architecture Decisions

State remains in the parent (Dashboard)

MetricCard remains a pure presentational component

Business logic separated from UI component

Prepared foundation for future integration with database data

💡 Reflections

Experienced initial friction recalling useState syntax.
Successfully implemented interactive state updates without copying code.
Confirmed understanding of React reactivity through live testing.

Regained confidence in building dynamic interfaces.