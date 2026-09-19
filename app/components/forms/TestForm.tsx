// app/components/forms/TestForm.tsx
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "~/components/forms/FormInput";
import FormNumberField from "~/components/forms/FormNumberField";
import FormCombobox from "~/components/forms/FormCombobox";
import FormSelect from "~/components/forms/FormSelect";
import FormSlider from "~/components/forms/FormSlider";
import FormTextarea from "~/components/forms/FormTextarea";
import { Button } from "~/components/ui/button";

// 1. Define Zod Validation Schema
const testFormSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  city: z.string().min(1, "Please select a destination city"),
  starRating: z.number().min(1, "Min star rating is 1").max(5, "Max star rating is 5"),
  roomType: z.string().min(1, "Please choose a room type"),
  priceRange: z.array(z.number()).length(2, "Price range must contain min and max"),
  specialRequests: z.string().max(200, "Requests cannot exceed 200 characters").optional(),
});

type TestFormValues = z.infer<typeof testFormSchema>;

// Mock data options
const CITY_OPTIONS = [
  { label: "Tokyo, Japan", value: "Tokyo" },
  { label: "London, UK", value: "London" },
  { label: "New York, USA", value: "New York" },
  { label: "Paris, France", value: "Paris" },
  { label: "Sydney, Australia", value: "Sydney" },
];

const ROOM_OPTIONS = [
  { label: "Standard Single", value: "single" },
  { label: "Deluxe King", value: "deluxe-king" },
  { label: "Executive Suite", value: "executive-suite" },
];

export default function TestForm() {
  const [submittedData, setSubmittedData] = React.useState<TestFormValues | null>(null);

  const { control, handleSubmit, reset } = useForm<TestFormValues>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      guestName: "",
      city: "",
      starRating: 3,
      roomType: "",
      priceRange: [100, 400],
      specialRequests: "",
    },
  });

  const onSubmit = (data: TestFormValues) => {
    setSubmittedData(data);
  };

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-8 bg-card text-card-foreground rounded-xl border border-border shadow-sm">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold tracking-tight">Form Wrappers Integration Test</h2>
        <p className="text-sm text-muted-foreground">
          Testing React Aria Components wrapped in React Hook Form.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. Text Input */}
        <FormInput
          name="guestName"
          control={control}
          label="Primary Guest Name"
          description="Enter full legal name as it appears on ID"
          placeholder="e.g. Joshua Peters"
        />

        {/* 2. Combobox (Autocomplete City Search) */}
        <FormCombobox
          name="city"
          control={control}
          label="Destination City"
          description="Select travel destination"
          options={CITY_OPTIONS}
          placeholder="Search cities..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 3. Number Field Stepper */}
          <FormNumberField
            name="starRating"
            control={control}
            label="Minimum Star Rating"
            description="1 to 5 stars"
            minValue={1}
            maxValue={5}
          />

          {/* 4. Select Dropdown */}
          <FormSelect
            name="roomType"
            control={control}
            label="Room Category"
            description="Select room tier"
            options={ROOM_OPTIONS}
            placeholder="Select a category..."
          />
        </div>

        {/* 5. Dual-Thumb Slider */}
        <FormSlider
          name="priceRange"
          control={control}
          label="Nightly Budget Range ($)"
          description="Slide to filter price boundaries"
          minValue={50}
          maxValue={1000}
          step={25}
        />

        {/* 6. Textarea */}
        <FormTextarea
          name="specialRequests"
          control={control}
          label="Special Requests (Optional)"
          description="Late check-in notes, high floor preference, etc."
          placeholder="Write your requests here..."
          rows={3}
        />

        {/* Form Controls */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button type="submit" variant="default" className="flex-1">
            Submit Test Form
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setSubmittedData(null);
            }}
          >
            Reset Form
          </Button>
        </div>
      </form>

      {/* Live Form State Display */}
      {submittedData && (
        <div className="mt-6 p-4 rounded-lg bg-muted text-muted-foreground border border-border">
          <h3 className="text-sm font-semibold mb-2 text-foreground">Submitted Payload:</h3>
          <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}