import * as React from "react";
import type { CalendarDate, DateValue } from "@internationalized/date";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-aria-components";
import { DateField, DateInput, DateSegment } from "react-aria-components";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Field, FieldLabel } from "~/components/ui/field";
import { Popover, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";

function DateFieldInput({
  label,
  value,
  onChange,
  minValue,
}: {
  label: string;
  value: DateValue | null;
  onChange: (value: DateValue | null) => void;
  minValue?: DateValue;
}) {
  return (
    <div className="min-w-0 flex-1">
      <FieldLabel className="text-xs text-muted-foreground">{label}</FieldLabel>
      <div className="flex h-9 items-center rounded-md border border-input bg-background shadow-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50">
        <DateField
          value={value}
          onChange={onChange}
          minValue={minValue}
          granularity="day"
          aria-label={label}
          className="min-w-0 flex-1"
        >
          <DateInput className="flex min-w-0 items-center px-2 text-sm">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="rounded px-0.5 outline-none focus:bg-accent focus:text-accent-foreground"
              />
            )}
          </DateInput>
        </DateField>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Choose ${label.toLowerCase()} date`}
            className="mr-0.5 shrink-0"
          >
            <CalendarIcon aria-hidden="true" />
          </Button>
          <Popover className="w-auto p-0" placement="bottom end">
            <Calendar
              value={value as CalendarDate | null}
              onChange={(nextValue) => onChange(nextValue)}
              minValue={minValue as CalendarDate | undefined}
              autoFocus
            />
          </Popover>
        </PopoverTrigger>
      </div>
    </div>
  );
}

export function DatePickerWithRange({ 
  date, 
  setDate, 
  className 
}: { 
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}) {
  const handleStartChange = (start: DateValue | null) => {
    if (!start) {
      setDate(undefined);
      return;
    }

    const end = date?.end && date.end.compare(start) >= 0 ? date.end : start;
    setDate({ start, end });
  };

  const handleEndChange = (end: DateValue | null) => {
    if (!date?.start || !end) {
      setDate(undefined);
      return;
    }

    setDate({ start: date.start, end });
  };

  return (
    <Field className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel className="sr-only">Select travel dates</FieldLabel>
      <div className="flex gap-2">
        <DateFieldInput
          label="Start"
          value={date?.start ?? null}
          onChange={handleStartChange}
        />
        <DateFieldInput
          label="End"
          value={date?.end ?? null}
          onChange={handleEndChange}
          minValue={date?.start}
        />
      </div>
    </Field>
  );
}