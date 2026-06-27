# Badminton Tournament App — Regression Test Suite

Playwright TypeScript UI regression automation for [Badminton Tournament App](https://rajeshmokaalla.github.io/badminton-tournament/).

## Framework Architecture

```
badmintonAppRegression/
├── playwright.config.ts        # Playwright config (browsers, base URL, reporters)
├── package.json
├── tsconfig.json
├── pages/                      # Page Object Model
│   ├── BasePage.ts             # Shared helpers
│   ├── HomePage.ts             # Root page entry point
│   ├── PlayerSection.ts        # Player management
│   ├── TeamSection.ts          # Team assignment
│   ├── TournamentSection.ts    # Tournament flow
│   ├── CloudSection.ts         # Cloud save/load
│   ├── CourtBookingSection.ts  # Court & expense tracking
│   ├── StatsSection.ts         # Player statistics
│   ├── AdminSection.ts         # Admin subscriptions
│   └── ContactSection.ts       # Contact & privacy
├── tests/                      # Test suites (12 suites, 138+ tests)
│   ├── 01-navigation.spec.ts
│   ├── 02-players.spec.ts
│   ├── 03-teams.spec.ts
│   ├── 04-tournament.spec.ts
│   ├── 05-cloud.spec.ts
│   ├── 06-court-booking.spec.ts
│   ├── 07-stats.spec.ts
│   ├── 08-admin.spec.ts
│   ├── 09-contact.spec.ts
│   ├── 10-responsive.spec.ts
│   ├── 11-pwa.spec.ts
│   └── 12-accessibility.spec.ts
└── utils/
    ├── helpers.ts
    └── test-data.ts
```

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# All tests (all browsers)
npm test

# Headed mode (watch in browser)
npm run test:headed

# Interactive UI mode
npm run test:ui

# Run a specific suite
npm run test:players
npm run test:tournament
npm run test:responsive

# Debug a test
npm run test:debug

# Open HTML report
npm run test:report
```

## CI/CD

GitHub Actions runs the full suite on every push and pull request across Chromium, Firefox, and WebKit. Mobile viewports are tested separately. Reports are uploaded as artifacts and retained for 30 days.

## Test Coverage

| Suite | Area | # Tests |
|---|---|---|
| 01-navigation | Page load, headings, section order, console errors | 13 |
| 02-players | Add, clear, Enter key, empty state, validation | 16 |
| 03-teams | Format selection, assignment modes, inputs | 16 |
| 04-tournament | Start, undo, export, play again, reset | 12 |
| 05-cloud | Auth UI, sign-in buttons, Supabase sync text | 9 |
| 06-court-booking | Members, bookings, expenses, split summary | 16 |
| 07-stats | Load stats, lifetime stats display | 7 |
| 08-admin | Subscription form, price, refund policy | 10 |
| 09-contact | Email/phone links, privacy, Supabase mention | 12 |
| 10-responsive | 5 viewports × 3 tests + extras | 18 |
| 11-pwa | Manifest, SW, HTTPS, viewport meta, icons | 9 |
| 12-accessibility | ARIA, keyboard nav, heading hierarchy, alt text | 10 |
