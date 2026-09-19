/**
 * HotelCard Component
 * 
 * Displays a single hotel card with essential information including location, name, star rating,
 * overall guest rating and review count, top amenities badges, starting price, and an action button.
 */

import * as React from "react";
import { Star, MapPin, Award, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";

/**
 * @typedef {Object} Address
 * @property {string} city - City name
 * @property {string} state - State abbreviation or full name
 */

/**
 * @typedef {Object} Room
 * @property {number} price_per_night - Price per night for this room type
 */

const HotelCard = ({ hotel, onSelect }) => {
  /**
   * Calculate the starting price from the rooms array.
   * Returns 0 if no rooms are available or calculation fails.
   * 
   * @param {Object} hotel.rooms - Array of Room objects
   * @returns {number} Minimum price per night, or 0 if unavailable
   */
  const minPrice = hotel.rooms?.length > 0
    ? Math.min(...hotel.rooms.map((room) => room.price_per_night))
    : 0;

  return (
    <article className="flex flex-col h-full rounded-xl border border-border border-t-4 border-t-primary bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span>{hotel.address.city}, {hotel.address.state}</span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
            {hotel.name}
          </h3>
        </div>

        {/* Rating & Score Badges */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3.5 ${
                  i < hotel.star_rating
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="ml-1 font-medium text-foreground">{hotel.star_rating}-Star</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground font-semibold">
            <Award className="size-3 text-primary" />
            <span>{hotel.overall_rating}</span>
            <span className="text-muted-foreground font-normal">({hotel.review_count})</span>
          </div>
        </div>

        {/* Amenity Badges */}
        <div className="flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground capitalize"
            >
              <Sparkles className="size-2.5 text-primary" />
              {amenity.replace(/_/g, ' ')}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Card Action Footer */}
        <div className="pt-4 mt-auto border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starting from</p>
            <p className="text-base font-extrabold text-foreground">${minPrice}</p>
          </div>
          <Button
            onClick={() => onSelect(hotel)}
            variant="default"
            size="sm"
            aria-label={`View details and check availability for ${hotel.name}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
