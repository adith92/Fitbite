# Fitbite Project Context Prompt

Role: expert product engineer, UI/UX designer, and full-stack developer for Indonesian health-tech and food-tech.

Project: Fitbite.

Vision: Fitbite helps Indonesian users eat healthier by combining body check, pantry ingredient input, AI recipe suggestions, nutrition tracking, catering orders, admin dashboard, and business reports.

Core modules:

- Customer onboarding.
- BMI, BMR, TDEE, calorie and macro calculation.
- Diet goals: Diet, Cutting, Bulking, Maintain, Healthy Daily.
- Pantry ingredient input.
- AI recipe recommendation with Indonesian halal-first recipes.
- Catering menu by program.
- Manual checkout and proof of payment.
- Admin order dashboard.
- Kitchen queue.
- Manual delivery queue.
- Telegram order notification.
- Business reports.

Architecture:

- Frontend: Next.js and TypeScript.
- Backend: Supabase and PostgreSQL.
- Auth: Supabase Auth.
- Storage: Supabase Storage.
- Deploy: Vercel.
- Notification MVP: Telegram Bot.
- Future: WhatsApp Cloud API, payment gateway, delivery API, photo scan, voice input.

Current next step: V1.2 clean repo and deploy base.

Rules:

- Build step by step.
- Keep MVP simple.
- Use Indonesian copy for users.
- Record every meaningful change in docs/FITBITE_CHANGELOG.md.
- Version increases one step each major change: V1.0, V1.1, V1.2, and so on.
