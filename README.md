# Potato Tarot Reading — Realtime Info Board

Phase 1 of the rebuild: Next.js 15 + TypeScript + Tailwind + Framer Motion +
Firebase (Firestore realtime), with the public landing page fully wired.
The original dark/gold glassmorphism aesthetic is preserved.

## What's included in this phase

- Project scaffold (`package.json`, `tsconfig.json`, Tailwind config with the
  original color tokens: `#090909` bg, `#d4af37` gold accent, glass surfaces)
- `firebase/client.ts` — Firebase App/Firestore/Auth/Storage init
- `types/index.ts` — shared types for `BoardSettings`, `QueueEntry`,
  `SessionSlot`, `HistoryEntry`, `RevenueDay`, `NotificationSettings`
- `hooks/useFirestoreDoc.ts`, `hooks/useFirestoreCollection.ts` — realtime
  `onSnapshot` hooks
- `components/landing/*` — Navbar, Hero, TodayStatus, PriceList, TodayQueue,
  HowToOrder, Footer. **No booking modal, payment flow, QR popup, contact
  links, testimonials, or FAQ** — this is a display-only board per spec.
- `firestore.rules` / `storage.rules` — public read-only, admin-only writes
- `scripts/seed.mjs` — bootstraps the `settings/board` document

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your Firebase project config
npm run dev
```

You'll need a Firebase project with Firestore, Authentication (Google
provider), and Storage enabled. Deploy the rules:

```bash
firebase deploy --only firestore:rules,storage:rules
```

Then seed the initial board document (requires a service account key, see
`scripts/seed.mjs`):

```bash
node scripts/seed.mjs
```

## Firestore schema (so far)

- `settings/board` — single doc, drives the entire public board (status,
  hours, slots, wait time, TikTok handle, QRIS URL)
- `queue/{id}` — one doc per customer in today's queue (`status`,
  `position`, `isPremium`, `maskName` for privacy on the public board)

Phase 2 will add `sessions`, `history`, `revenue`, `notificationSettings`,
and the admin dashboard that manages all of it.

## Roadmap

- [x] **Phase 1** — Scaffold + public landing page (this delivery)
- [ ] **Phase 2** — Google auth-gated `/admin`, dashboard shell, Queue /
      Session / Premium management (add/edit/delete/move/next-queue)
- [ ] **Phase 3** — QRIS upload, Settings panel, History with search/filter/
      export, Revenue dashboard with charts, Telegram/Discord notifications,
      xlsx export

## Notes

- The public board **never** reveals a customer's full name for entries
  after "Now Reading" — controlled by the `maskName` flag on each queue
  entry, set by the admin when adding a customer.
- All public reads are Firestore realtime listeners — no polling, no manual
  refresh needed.
