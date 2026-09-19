// app/routes.ts
import { index, route } from "@react-router/dev/routes";

export default [
  // Top-level index route
  index("routes/home.jsx"),

  // Dedicated hotel route
  route("hotels/:id", "routes/hotel-detail.jsx"),

  // Reservation checkout route
  route("hotels/:id/reserve", "routes/reservation.jsx"),
];