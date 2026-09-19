# Assumptions and Tradeoffs

This document records the main implementation decisions behind InfiniteChoice.

## Local Mock Data

The application uses `app/data/mockHotels.json` as its data source. This keeps the
interface deterministic and easy to run locally without a database or API credential.
The tradeoff is that hotel data, availability, and prices are static and must be replaced
with a service integration for production use.

## Local State Instead of a Global Store

Filter values and derived results are managed with React state in `useHotelFilters`.
React Hook Form owns the editable form state until submission. This is sufficient because
the filter state is only used by the listing page and its child components. A global store
would add dependency and synchronization overhead without a current cross-route state
requirement.

## URL-Driven Hotel Details

Hotel details are represented by `/hotels/:id`, making detail views shareable and allowing
direct navigation or refresh. The home layout is reused for the detail route and the modal
is opened when the route parameter resolves to a known hotel. The tradeoff is that the
listing page remains mounted for the detail route, rather than using a separate standalone
detail page.

## Exact City and State Matching

The destination option is represented as `City, State` and the filtering hook splits that
value before matching it against `hotel.address.city` and `hotel.address.state`. This avoids
ambiguity when different states contain cities with the same name. The tradeoff is that
the option format depends on the source address schema and would need adjustment if
locations became structured objects or internationalized.

## Room-Level Price Filtering

A hotel matches a price range when at least one room has a nightly price inside the range.
This reflects the discovery use case: a property is useful if it has at least one matching
room. The tradeoff is that the list does not distinguish which room matched until the
detail modal is opened.

The room availability checker applies the opposite rule for a stay: a room is shown only
when its `available_dates` contains every date from check-in through check-out. Hotels or
date ranges with no matching room display a dedicated empty state with a prompt to try
different dates.

## Client-Side Filtering

Filtering runs in the browser over the loaded mock dataset. This keeps interactions
immediate and avoids request state, loading states, and server query concerns. For a large
or frequently changing inventory, filtering should move to a server or search endpoint
with pagination and request-level validation.

## Validation Coverage

The repository provides TypeScript checks, production builds, Playwright browser smoke
tests, and a manual smoke-test workflow. The automated suite covers dashboard loading,
city filtering, routed hotel details, and reservation confirmation. It intentionally
does not attempt to test a real payment provider or backend reservation persistence.

## Reservation Checkout

The reservation page is a client-side checkout demonstration. It validates required
guest name and email fields, carries hotel, room, and stay-date context through the URL,
and displays a confirmation state without creating a backend booking. This keeps the
assignment self-contained while leaving a clear boundary for a future reservation API.