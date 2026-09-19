import * as React from "react";
import { useForm } from "react-hook-form";
import FormCombobox from "~/components/forms/FormCombobox";
import FormNumberField from "~/components/forms/FormNumberField";
import FormSlider from "~/components/forms/FormSlider";
import { Button } from "~/components/ui/button";
import { Filter, RotateCcw, Search } from "lucide-react";

const DEFAULT_FILTERS = {
  city: "",
  minStars: 1,
  priceRange: [50, 1000],
};

const HotelFilterSidebar = ({
  cities,
  initialValues,
  onApplyFilters,
  onResetFilters,
}) => {
  const cityOptions = React.useMemo(() => {
    return [
      { label: "All Destinations", value: "" },
      ...cities.map((city) => ({ label: city, value: city })),
    ];
  }, [cities]);

  // Removed the TypeScript generic <HotelFilterState>
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      ...DEFAULT_FILTERS,
      ...initialValues,
    },
  });

  const handleReset = () => {
    reset(DEFAULT_FILTERS);
    onResetFilters();
  };

  return (
    <aside
      aria-label="Hotel search filters"
      className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm space-y-6"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-primary" />
          <h2 className="text-base font-bold">Filter Properties</h2>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <RotateCcw className="size-3" />
          Reset
        </Button>
      </div>

      <form onSubmit={handleSubmit(onApplyFilters)} className="space-y-5">
        <FormCombobox
          name="city"
          control={control}
          label="Destination City"
          description="Filter properties by location"
          options={cityOptions}
          placeholder="Search destination..."
        />

        <FormNumberField
          name="minStars"
          control={control}
          label="Minimum Star Rating"
          description="Choose 1 to 5 stars"
          minValue={1}
          maxValue={5}
        />

        <FormSlider
          name="priceRange"
          control={control}
          label="Nightly Price Range ($)"
          description="Filter nightly room rates"
          minValue={50}
          maxValue={1000}
          step={25}
          formatValue={(val) => `$${val}`}
        />

        <div className="pt-2 flex gap-2">
          <Button type="submit" variant="default" className="w-full gap-2">
            <Search className="size-4" />
            Apply Filters
          </Button>
        </div>
      </form>
    </aside>
  );
}

export default HotelFilterSidebar;