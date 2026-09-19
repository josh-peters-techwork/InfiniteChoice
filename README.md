# InfiniteChoice

InfiniteChoice is a React Router hotel discovery interface. It includes destination,
star-rating, and nightly-price filters, routed hotel detail modals, and a local mock
hotel dataset.

## Prerequisites

- Node.js 20 or newer
- pnpm 9 or newer

## Install

From the repository root, install the dependencies:

```bash
pnpm install
```

## Run Locally

Start the React Router development server:

```bash
pnpm dev
```

Open the local URL printed by the command. Hotel detail views are addressable directly,
for example `/hotels/hotel-01`. Closing a detail modal returns to `/`.

## Validate Locally

Run the TypeScript and React Router type-generation checks:

```bash
pnpm typecheck
```

Create a production build:

```bash
pnpm build
```

Run the browser smoke tests:

```bash
pnpm test:smoke
```

The smoke suite starts the development server automatically and covers the main
dashboard, filtering, routed hotel detail, reservation validation errors, and checkout
confirmation flows. For a local
manual smoke test, use `pnpm dev` and verify that:

1. The hotel grid loads from `app/data/mockHotels.json`.
2. Applying a city, star, and price filter updates the result count and cards.
3. Resetting filters restores all hotels.
4. Selecting a hotel changes the URL to `/hotels/:id` and opens its modal.
5. Opening a known hotel URL directly loads the correct hotel, and closing it returns to `/`.
6. Selecting dates with no room inventory shows a clear empty state in the detail modal.
7. Reserving an available room opens `/hotels/:id/reserve` and submitting guest details shows a confirmation state.

## Component Breakdown

- `app/routes/home.jsx` composes the page, owns navigation, and derives the selected hotel from the route parameter.
- `app/routes/hotel-detail.jsx` reuses the home layout for `/hotels/:id` so the detail view behaves as a routed modal over the listing page.
- `app/routes/reservation.jsx` renders the reservation checkout and confirmation flow for a selected room.
- `app/components/hotel/HotelFilterSidebar.jsx` renders the filter form and submits values from React Hook Form.
- `app/components/hotel/HotelGrid.jsx` renders the result list and empty state.
- `app/components/hotel/HotelCard.jsx` renders an individual hotel summary and opens its routed detail view.
- `app/components/hotel/HotelDetailModal.jsx` displays hotel information and room availability inside the dialog.
- `app/hooks/useHotelFilters.js` applies city/state, star-rating, and room-price filtering and exposes reset behavior.
- `app/components/forms` and `app/components/ui` contain reusable form wrappers and React Aria/shadcn-style primitives.

## State Management

The application uses local React state and derived values rather than a global state
library. `useHotelFilters` stores the currently applied filter values and derives the
filtered hotel list with `useMemo`. React Hook Form manages the sidebar's transient form
state and passes submitted values to the hook. React Router is the source of truth for
the selected hotel: the `/hotels/:id` parameter determines which modal is open, and
navigation closes it by returning to `/`.

## AI Tooling Disclosure

Gemini was used during the initial design phase to compare component choices and
generate basic starter code that accelerated the first implementation. GitHub Copilot
was then used throughout development as an implementation and review assistant. It
helped inspect the existing React Router structure, design and wire the routed hotel
modal, implement the React Hook Form and React Aria combobox integration, create the
`useHotelFilters` hook, diagnose the city/state value mismatch, and draft the README
and assumptions documentation. Copilot also suggested validation steps and reviewed
build and typecheck results. All AI-generated changes were inspected, adapted to the
repository, and verified with `pnpm typecheck`, `pnpm build`, and manual UI smoke
testing.

## Useful Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm typecheck` | Generate route types and run TypeScript checks |
| `pnpm build` | Build the client and server bundles |
| `pnpm test:smoke` | Run Playwright browser smoke tests |
| `pnpm start` | Serve the existing production build |
