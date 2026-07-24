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

- [x] **Phase 1** — Scaffold + public landing page
- [x] **Phase 2** — Google-auth-gated `/admin`, dashboard shell, Queue /
      Session / Premium management (this delivery)
- [ ] **Phase 3** — Settings polish, History with search/filter/export,
      Revenue dashboard with charts, Telegram/Discord notifications, xlsx
      export

## Phase 2: Admin Dashboard

- `/admin/login` — Google sign-in. Only emails listed in
  `NEXT_PUBLIC_ADMIN_EMAILS` (and mirrored in `firestore.rules`'
  `isAdmin()`) can get past the gate; everyone else is redirected back to
  login.
- `/admin` — quick status overview (current status, remaining slots, queue
  counts, who's currently reading).
- `/admin/queue` — add/edit/delete customers, reorder the waiting list,
  "Selesai" (finish reading → archives to `history`, removes from the
  public board), "Next Queue" (promotes the next WAITING customer to
  READING). General and Premium queues are managed as separate segments.
- `/admin/sessions` — create/delete Tanya Bebas (Rp20.000) time slots,
  adjust capacity.
- `/admin/premium` — adjust today's premium queue capacity.
- `/admin/settings` — status (OPEN/BREAK/CLOSED), Full Today toggle
  (`acceptingOrders`), working hours, total slot capacity, estimated wait
  text, TikTok username. All writes go straight to `settings/board` and
  reflect on the public landing page instantly (realtime listener, no
  refresh needed).

**Important:** keep the admin email(s) in sync in two places —
`.env.local` / Netlify's `NEXT_PUBLIC_ADMIN_EMAILS`, and the `isAdmin()`
function in `firestore.rules`. The env var gates the UI; the Firestore
rule is what actually enforces write permission at the database level.

## Notes

- The public board **never** reveals a customer's full name for entries
  after "Now Reading" — controlled by the `maskName` flag on each queue
  entry, set by the admin when adding a customer.
- All public reads are Firestore realtime listeners — no polling, no manual
  refresh needed.
