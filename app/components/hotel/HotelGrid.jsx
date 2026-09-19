import * as React from "react";
import HotelCard from "./HotelCard";
import { Building2, RotateCcw } from "lucide-react";
import { Button } from "~/components/ui/button";

const HotelGrid = ({ hotels, onSelectHotel, onResetFilters }) => {
  // Empty State Handling
  if (hotels.length === 0) {
    return (
      <div className="col-span-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm min-h-[380px]">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted mb-4">
          <Building2 className="size-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No Hotels Found</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-md">
          We couldn't find any properties matching your search criteria. Try adjusting your destination, star rating, or budget slider.
        </p>
        <Button onClick={onResetFilters} variant="outline" className="mt-6 gap-2">
          <RotateCcw className="size-4" />
          Reset All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="col-span-12 sm:col-span-6">
          <HotelCard hotel={hotel} onSelect={onSelectHotel} />
        </div>
      ))}
    </div>
  );
}

export default HotelGrid;