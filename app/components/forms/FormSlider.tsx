import * as React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import FormField, { type FormFieldProps } from "./FormField";
import { Slider } from "~/components/ui/slider";

export interface FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, "children"> {
  minValue?: number;
  maxValue?: number;
  step?: number;
  formatValue?: (val: number) => string;
}

export default function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormSliderProps<TFieldValues, TName>) {
  const {
    minValue = 0,
    maxValue = 1000,
    step = 10,
    formatValue = (v) => `$${v}`,
    ...fieldProps
  } = props;

  return (
    <FormField {...fieldProps}>
      {({ value, onChange, isInvalid, id }) => {
        const sliderValue = Array.isArray(value) ? value : [minValue, maxValue];

        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>{formatValue(sliderValue[0])}</span>
              <span>{formatValue(sliderValue[1])}</span>
            </div>
            <Slider
              id={id}
              value={sliderValue}
              onChange={(val) => onChange(val)}
              minValue={minValue}
              maxValue={maxValue}
              step={step}
              aria-label={fieldProps.label ?? "Price range slider"}
            />
          </div>
        );
      }}
    </FormField>
  );
}