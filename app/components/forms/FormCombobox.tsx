import * as React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import FormField, { type FormFieldProps } from "./FormField";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "~/components/ui/combobox";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface FormComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, "children"> {
  options: ComboboxOption[];
  placeholder?: string;
}

export default function FormCombobox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormComboboxProps<TFieldValues, TName>) {
  const { options, placeholder = "Select option...", ...fieldProps } = props;

  return (
    <FormField {...fieldProps}>
      {({ value, onChange, isInvalid, id }) => (
        <Combobox
          selectedKey={value || null}
          onSelectionChange={(key) => onChange(key ?? "")}
          isInvalid={isInvalid}
          className="w-full"
        >
          <ComboboxInput id={id} placeholder={placeholder} showClear showTrigger />
          <ComboboxContent>
            <ComboboxList aria-label={fieldProps.label ?? "Options"}>
              {options.map((item) => (
                <ComboboxItem key={item.value} id={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
            <ComboboxEmpty>No cities found</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      )}
    </FormField>
  );
}