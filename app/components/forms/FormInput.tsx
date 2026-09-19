import * as React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import FormField, { type FormFieldProps } from "./FormField";
import { Input } from "~/components/ui/input";

export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, "children"> {
  placeholder?: string;
  type?: string;
}

export default function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormInputProps<TFieldValues, TName>) {
  const { placeholder, type = "text", ...fieldProps } = props;

  return (
    <FormField {...fieldProps}>
      {({ value, onChange, onBlur, name, id }) => (
        <Input
          id={id}
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      )}
    </FormField>
  );
}