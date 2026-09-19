import * as React from "react";
import { useNavigate, useParams } from "react-router";
import HotelFilterSidebar from "~/components/hotel/HotelFilterSidebar";
import HotelGrid from "~/components/hotel/HotelGrid";
import HotelDetailModal from "~/components/hotel/HotelDetailModal";
import useHotelFilters from "~/hooks/useHotelFilters";

// Seed Dataset Import (40 Properties across 10 Hubs)
import mockData from "~/data/mockHotels.json";

const Home = () => {
  const [allHotels] = React.useState(mockData);
  const { filteredHotels, applyFilters, resetFilters } = useHotelFilters(allHotels);
  const navigate = useNavigate();
  const { id: hotelId } = useParams();
  const selectedHotel = allHotels.find((hotel) => hotel.id === hotelId) ?? null;

  // Extract unique cities list for Combobox
  const cities = React.useMemo(() => {
    return Array.from(new Set(allHotels.map((h) => `${h.address.city}, ${h.address.state}`))).sort();
  }, [allHotels]);

  const handleSelectHotel = React.useCallback((hotel) => {
    navigate(`/hotels/${hotel.id}`);
  }, [navigate]);

  const handleCloseModal = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              TS
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Terra Stay</h1>
          </div>

          {/* Dynamic Screen Reader Announcement Region */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full"
          >
            Showing {filteredHotels.length} of {allHotels.length} properties
          </div>
        </div>
      </header>

      {/* Main Responsive 12-Column Dashboard Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar (Span 4 on Desktop, Span 12 on Mobile) */}
          <div className="col-span-12 lg:col-span-4">
            <HotelFilterSidebar
              cities={cities}
              onApplyFilters={applyFilters}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Main Results Grid (Span 8 on Desktop, Span 12 on Mobile) */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <HotelGrid
              hotels={filteredHotels}
              onSelectHotel={handleSelectHotel}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </main>

      {/* Hotel Detail View Modal */}
      <HotelDetailModal
        hotel={selectedHotel}
        isOpen={Boolean(selectedHotel)}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Home;