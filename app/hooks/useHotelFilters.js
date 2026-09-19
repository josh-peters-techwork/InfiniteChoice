import * as React from "react";

const useHotelFilters = (hotels) => {
  const [filters, setFilters] = React.useState(null);

  const filteredHotels = React.useMemo(() => {
    if (!filters) return hotels;

    const [cityName = "", state = ""] = (filters.city ?? "")
      .split(",")
      .map((part) => part.trim().toLowerCase());
    const [minPrice, maxPrice] = filters.priceRange ?? [];

    return hotels.filter((hotel) => {
      const matchesCity =
        !cityName || hotel.address.city.toLowerCase() === cityName;
      const matchesState =
        !state || hotel.address.state.toLowerCase() === state;
      const matchesStars = hotel.star_rating >= (filters.minStars ?? 1);
      const matchesPrice = hotel.rooms?.some(
        (room) => room.price_per_night >= minPrice && room.price_per_night <= maxPrice
      );

      return matchesCity && matchesState && matchesStars && matchesPrice;
    });
  }, [filters, hotels]);

  const applyFilters = React.useCallback((nextFilters) => {
    setFilters(nextFilters);
  }, []);

  const resetFilters = React.useCallback(() => {
    setFilters(null);
  }, []);

  return { filteredHotels, applyFilters, resetFilters };
};

export default useHotelFilters;
