import * as React from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { parseDate } from "@internationalized/date";
import { ArrowLeft, CheckCircle2, CreditCard, MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import FormInput from "~/components/forms/FormInput";
import mockData from "~/data/mockHotels.json";

const reservationSchema = z.object({
  guestName: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().pipe(z.email({ error: "Enter a valid email address" })),
});

const Reservation = () => {
  const navigate = useNavigate();
  const { id: hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [confirmedGuestName, setConfirmedGuestName] = React.useState("");
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: "",
      email: "",
    },
  });

  const hotel = mockData.find((item) => item.id === hotelId);
  const room = hotel?.rooms.find((item) => item.room_id === searchParams.get("room"));
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const hasValidDates = start && end && start <= end;

  const getNightCount = (checkIn, checkOut) => {
    let currentDate = parseDate(checkIn);
    const checkoutDate = parseDate(checkOut);
    let count = 0;

    while (currentDate.compare(checkoutDate) < 0) {
      count += 1;
      currentDate = currentDate.add({ days: 1 });
    }

    return Math.max(1, count);
  };

  if (!hotel || !room || !hasValidDates) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <section className="w-full max-w-lg space-y-4 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Reservation details unavailable</h1>
          <p className="text-sm text-muted-foreground">
            Return to the hotel listing and choose an available room to continue.
          </p>
          <Button onClick={() => navigate("/")}>Return to hotels</Button>
        </section>
      </main>
    );
  }

  const nights = getNightCount(start, end);
  const total = room.price_per_night * nights;

  const handleReservationSubmit = ({ guestName }) => {
    setConfirmedGuestName(guestName);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <section className="w-full max-w-lg space-y-5 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto size-12 text-primary" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Reservation request received</h1>
            <p className="text-sm text-muted-foreground">
              We saved the request for {confirmedGuestName} at {hotel.name}.
            </p>
          </div>
          <Button onClick={() => navigate("/")}>Return to hotels</Button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          to={`/hotels/${hotel.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to hotel details
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-2 border-b border-border pb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Reservation checkout</p>
              <h1 className="text-3xl font-bold tracking-tight">Complete your stay</h1>
              <p className="text-sm text-muted-foreground">Enter guest details to submit a reservation request.</p>
            </div>

            <form onSubmit={handleSubmit(handleReservationSubmit)} className="space-y-5">
              <FormInput
                name="guestName"
                control={control}
                label="Guest name"
              />
              <FormInput
                name="email"
                control={control}
                label="Email address"
                type="email"
              />
              <Button type="submit" className="w-full gap-2">
                <CreditCard className="size-4" />
                Submit reservation request
              </Button>
            </form>
          </section>

          <aside className="h-fit space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold">{hotel.name}</h2>
              <p className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
                {hotel.address.city}, {hotel.address.state}
              </p>
            </div>
            <div className="space-y-3 border-t border-border pt-4 text-sm">
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">Room</span><span className="text-right font-medium">{room.type}</span></div>
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">Dates</span><span className="text-right font-medium">{start} to {end}</span></div>
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">Rate</span><span className="font-medium">${room.price_per_night} / night</span></div>
              <div className="flex justify-between gap-4 border-t border-border pt-3 text-base font-bold"><span>Total</span><span>${total}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Reservation;