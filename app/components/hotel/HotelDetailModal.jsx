import * as React from "react";
import { useNavigate } from "react-router";
import { Dialog, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { DatePickerWithRange } from "~/components/ui/date-picker-with-range";
import { parseDate } from "@internationalized/date";
import { Star, MapPin, Award, CheckCircle2, CalendarX, Users, BedDouble } from "lucide-react";

const HotelDetailModal = ({ hotel, isOpen, onClose }) => {
  const navigate = useNavigate();
  // Initialize state with React Aria's CalendarDate objects
  const [dateRange, setDateRange] = React.useState({
    start: parseDate("2026-07-10"),
    end: parseDate("2026-07-12")
  });

  if (!hotel) return null;

  const selectedDates = React.useMemo(() => {
    if (!dateRange?.start) return [];

    const endDate = dateRange.end ?? dateRange.start;
    const dates = [];
    let currentDate = dateRange.start;

    while (currentDate.compare(endDate) <= 0) {
      dates.push(currentDate.toString());
      currentDate = currentDate.add({ days: 1 });
    }

    return dates;
  }, [dateRange]);

  // A room must be available for every selected night in the stay.
  const availableRooms = hotel.rooms.filter((room) => {
    return selectedDates.every((date) => room.available_dates.includes(date));
  });

  const dateLabel = dateRange?.start
    ? dateRange.end
      ? `${dateRange.start} through ${dateRange.end}`
      : dateRange.start.toString()
    : "these dates";

  const handleReserve = (room) => {
    const params = new URLSearchParams({
      room: room.room_id,
      start: dateRange.start.toString(),
      end: dateRange.end.toString(),
    });

    onClose();
    navigate(`/hotels/${hotel.id}/reserve?${params.toString()}`);
  };

  return (
    <Dialog 
      isOpen={isOpen} 
      onOpenChange={(open) => !open && onClose()}
      className="w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0"
    >
      <div className="p-6 space-y-6">
        
        {/* Header & Metadata */}
        <div className="space-y-1.5 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-1">
            <MapPin className="size-3.5 text-primary" />
            <span>{hotel.address.street}, {hotel.address.city}, {hotel.address.state} {hotel.address.zip_code}</span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground border-none">
            {hotel.name}
          </DialogTitle>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border text-sm">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${
                  i < hotel.star_rating ? "fill-primary text-primary" : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="ml-1.5 font-semibold text-foreground">{hotel.star_rating}-Star Property</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1 font-semibold text-secondary-foreground text-xs">
            <Award className="size-4 text-primary" />
            <span>{hotel.overall_rating} / 5 Rating</span>
            <span className="text-muted-foreground">({hotel.review_count} reviews)</span>
          </div>
        </div>

        {/* Description & Amenities */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">About the Hotel</h4>
          <DialogDescription className="text-sm text-foreground leading-relaxed">
            {hotel.description}
          </DialogDescription>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Featured Amenities</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {hotel.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs font-medium text-foreground capitalize">
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                <span>{amenity.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Availability Checker */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-foreground">Room Availability & Nightly Rates</h4>
              <p className="text-xs text-muted-foreground">Select travel dates to inspect available room tiers.</p>
            </div>
            
            {/* Implemented Date Picker Popover */}
            <DatePickerWithRange 
              date={dateRange}
              setDate={setDateRange}
              className="w-full sm:w-72"
            />
          </div>

          {/* Room List or Empty State */}
          {availableRooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center bg-muted/30 space-y-2">
              <CalendarX className="size-8 text-muted-foreground" />
              <p className="text-sm font-bold text-foreground">No Rooms Available</p>
              <p className="text-xs text-muted-foreground max-w-sm">
                This property has 0 open room inventory for {dateLabel}. Please try selecting alternative dates.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {availableRooms.map((room) => (
                <div
                  key={room.room_id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-border p-4 bg-background gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">{room.type}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5 text-primary" /> {room.max_occupancy} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble className="size-3.5 text-primary" /> {room.bed_count} {room.bed_type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-base font-extrabold text-foreground">${room.price_per_night}</span>
                      <span className="text-xs text-muted-foreground"> / night</span>
                    </div>
                    <Button size="sm" variant="default" onClick={() => handleReserve(room)}>
                      Reserve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default HotelDetailModal;