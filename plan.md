# Implementation Plan - Voice UI, Offline Indicators, Government Maps, Booking Module, and Accessibility Score

This plan outlines the implementation of a comprehensive feature set for a Citizen Dashboard, focusing on voice interaction, connectivity resilience, spatial information, service scheduling, and accessibility transparency.

## Scope Summary
- **Voice UI:** Microphone component with visual listening states and mock audio feedback.
- **Connectivity Status:** UI banner for "Disconnected" and "Syncing..." states using client-side caching.
- **Government Office Map:** Interactive map with search, markers, and detail pop-ups.
- **Appointment Booking:** Calendar-based booking system with confirmation and a 'My Appointments' view.
- **Accessibility Score:** Real-time WCAG compliance indicator highlighting failing elements.
- **Impact Overview:** Analytics dashboard visualizing citizen time saved and services delivered.

## Non-Goals
- Real backend voice-to-text or text-to-speech (simulated only).
- Actual email sending (simulated/mocked).
- Live server-side database (client-side `localStorage` persistence only).
- Real production-grade WCAG crawler (simulated score based on DOM attributes).

## Assumptions
- The application is a React-based SPA.
- Lucide React icons are available for UI indicators.
- Recharts or similar for the Analytics Dashboard.
- Map implementation will use a lightweight library or a simulated grid if API keys are restricted.

## Affected Areas
- `src/components/voice/`: Voice UI components.
- `src/components/connectivity/`: Offline/Syncing indicators.
- `src/components/map/`: Interactive map and search.
- `src/components/booking/`: Calendar and booking logic.
- `src/components/accessibility/`: Score display and overlay.
- `src/components/analytics/`: Impact overview charts.
- `src/hooks/`: Hooks for online status and data persistence.
- `src/App.tsx`: Main layout integration.

## Ordered Phases

### Phase 1: Infrastructure & Shared State
- Implement `useOnlineStatus` hook to track connectivity.
- Implement `useLocalStorage` hook for client-side persistence of appointments and UI settings.
- **Owner:** frontend_engineer

### Phase 2: Connectivity & Voice UI
- Create `ConnectivityBanner` with "Disconnected" and "Syncing..." transitions.
- Create `VoiceInterface` with animated microphone icon (Idle, Listening, Processing).
- **Owner:** frontend_engineer

### Phase 3: Interactive Map & Search
- Implement `OfficeMap` using a map library (e.g., Leaflet) or a custom SVG-based interactive grid.
- Add search and filter functionality for office locations.
- **Owner:** frontend_engineer

### Phase 4: Appointment Booking Module
- Build `BookingCalendar` for date/time selection.
- Build `AppointmentList` for the 'My Appointments' section in the dashboard.
- Implement logic for mock reminders.
- **Owner:** frontend_engineer

### Phase 5: Accessibility Score & Analytics
- Create `AccessibilityAuditor` component that scans the DOM for common missing attributes (e.g., `alt`, `aria-label`).
- Implement `ImpactOverview` with Recharts showing "Time Saved" and "Services Delivered".
- **Owner:** frontend_engineer

### Phase 6: Final Integration & Refinement
- Integrate all modules into the main `App.tsx` layout.
- Polish CSS transitions and responsive design.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build core features and complex UI components.
2. quick_fix_engineer — Layout polish and minor text/CSS adjustments.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** Build all core functional components including the Voice UI animations, Offline state transitions, Map integration, Appointment logic (using localStorage), Accessibility scanner, and Analytics charts.
- **Files:** `src/hooks/*`, `src/components/**/*`, `src/App.tsx`
- **Depends on:** none
- **Acceptance criteria:** Voice icon animates; Offline banner appears when network is simulated as off; Map markers are clickable; Appointments save to localStorage; Charts render correctly.

### 2. quick_fix_engineer
- **Phases:** 6
- **Scope:** Refine the final layout, ensure consistent spacing, fix any typos in the "Impact Overview" or "Disconnected" banners.
- **Files:** `src/index.css`, `src/App.tsx`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** Layout is responsive and visually cohesive across all new modules.
