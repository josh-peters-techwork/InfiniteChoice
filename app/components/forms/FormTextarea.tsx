import * as React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import FormField, { type FormFieldProps } from "./FormField";
import { Textarea } from "~/components/ui/textarea";

export interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, "children"> {
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormTextareaProps<TFieldValues, TName>) {
  const { placeholder, rows = 3, ...fieldProps } = props;

  return (
    <FormField {...fieldProps}>
      {({ value, onChange, onBlur, name, id }) => (
        <Textarea
          id={id}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
        />
      )}
    </FormField>
  );
}