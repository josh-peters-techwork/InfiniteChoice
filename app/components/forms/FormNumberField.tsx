import * as React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import FormField, { type FormFieldProps } from "./FormField";
import { NumberField } from "~/components/ui/number-field";

export interface FormNumberFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, "children"> {
  minValue?: number;
  maxValue?: number;
  step?: number;
  placeholder?: string;
}

export default function FormNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormNumberFieldProps<TFieldValues, TName>) {
  const { minValue, maxValue, step, placeholder, ...fieldProps } = props;

  return (
    <FormField {...fieldProps}>
      {({ value, onChange, isInvalid, id }) => (
        <NumberField
          value={value ?? NaN}
          onChange={onChange}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          placeholder={placeholder}
          isInvalid={isInvalid}
          inputId={id}
        />
      )}
    </FormField>
  );
}