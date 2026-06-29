# Implementation Plan - SmartGov AI Platform Redesign

This plan outlines the transformation of the Citizen Portal into **SmartGov AI**, an enterprise-grade digital governance platform for Nigeria. The redesign focuses on a national theme (green, white, gold), expanded service offerings, AI-driven features, and comprehensive analytics.

## Scope Summary
- **Theming & Branding:** Rename to "SmartGov AI" and implement a premium Nigerian-inspired theme (Green, White, Gold) with glassmorphism and modern animations.
- **Dashboard Redesign:** Create a personalized dashboard with quick access to AI Assistant, Services, Applications, etc.
- **Expanded Navigation:** 11 distinct sections including Fraud Reporting, Document Verification, and Analytics.
- **AI Citizen Assistant:** ChatGPT-like interface supporting English, Hausa, Yoruba, and Igbo.
- **Government Services Directory:** Searchable directory with eligibility and document requirements.
- **Fraud & Corruption Reporting:** Secure, anonymous reporting with tracking and evidence upload.
- **AI Document Verification:** Tool for checking document completeness and issues.
- **Analytics Dashboard:** Visualizing national-level KPIs like citizens served and fraud reports.
- **Refined Maps & Bookings:** Integrating previous features into the new enterprise UI.

## Non-Goals
- Real-time multi-lingual translation (using pre-defined mock strings).
- Real government API integrations (simulated service directory and status tracking).
- Real document parsing (simulated AI feedback based on "uploading" a file).

## Auth & RLS model
**Auth in scope:** no (client-side state only)
**Model:** no_auth_public_read
**RLS strategy:** n/a
**Frontend implication:** User profile is simulated; state managed via `localStorage`.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Affected Areas
- `src/index.css`: Global theme variables and glassmorphism styles.
- `src/App.tsx`: Main navigation logic, layout structure, and state management.
- `src/components/dashboard/`: New Dashboard layout and widgets.
- `src/components/assistant/`: ChatGPT-style interface with language switcher.
- `src/components/services/`: Services directory and card components.
- `src/components/fraud/`: Fraud reporting forms and tracking.
- `src/components/verification/`: Document upload and feedback UI.
- `src/components/analytics/`: Expanded KPI cards and charts.
- `src/components/ui/`: Potentially extending base UI for gold/green variants.

## Ordered Phases

### Phase 1: Branding & Global Styles
- Update `src/index.css` with Nigerian-inspired color palette (Deep Green, Pure White, Metallic Gold).
- Define glassmorphism and premium animation classes (Tailwind/Framer Motion).
- **Owner:** frontend_engineer

### Phase 2: Navigation & Core Layout
- Update `src/App.tsx` to include the expanded 11-item menu and the SmartGov AI branding.
- Implement the page switching logic for all new routes.
- **Owner:** frontend_engineer

### Phase 3: Personalized Dashboard
- Build the new Dashboard with the requested widgets (Emergency Alerts, Announcements, Quick Actions).
- Integrate existing Impact Overview into the new design.
- **Owner:** frontend_engineer

### Phase 4: AI Assistant & Services
- Build the ChatGPT-like `AIAssistant` component with a language switcher (English, Hausa, Yoruba, Igbo).
- Create the `ServiceDirectory` with searchable service cards and detail view.
- **Owner:** frontend_engineer

### Phase 5: Specialist Modules (Fraud & Verification)
- Implement `FraudReporting` with anonymous mode and tracking ID generation.
- Implement `DocumentVerification` with simulated "AI Analysis" progress states.
- **Owner:** frontend_engineer

### Phase 6: Analytics & Interactive Map Refinement
- Update `ImpactOverview` into a full `AnalyticsPage` with KPI cards.
- Refine the existing `OfficeMap` to match the new enterprise theme.
- **Owner:** frontend_engineer

### Phase 7: Polish & Transition
- Add smooth transitions between pages.
- Ensure all "My Applications" and "Appointments" states are persistent via `localStorage`.
- Final CSS cleanup.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Complete core redesign and all functional pages.
2. quick_fix_engineer — Final polish, transitions, and text consistency.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5, 6
- **Scope:** Complete overhaul. Update CSS variables in `index.css` for Green (#008751), Gold (#CFB53B), and White. Redesign `App.tsx` navigation. Build all 7+ new pages (Assistant, Services, Fraud, etc.).
- **Files:** `src/index.css`, `src/App.tsx`, `src/components/**/*`
- **Depends on:** none
- **Acceptance criteria:** App renamed to SmartGov AI; Theme is green/gold; 11 nav items work; AI page feels like a chat interface; Fraud reporting generates a tracking ID; Analytics shows KPI cards.

### 2. quick_fix_engineer
- **Phases:** 7
- **Scope:** Refine animations, ensure glassmorphism is consistent, check for typos in government service descriptions, and ensure mobile responsiveness on the new analytics charts.
- **Files:** `src/index.css`, `src/App.tsx`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** Seamless page transitions; no overlapping elements on mobile; correct Nigerian spelling/titles.
