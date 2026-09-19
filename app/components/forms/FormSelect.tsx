import * as React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import FormField, {type FormFieldProps } from "./FormField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopover,
  SelectList,
  SelectItem,
} from "~/components/ui/select";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, "children"> {
  options: SelectOption[];
  placeholder?: string;
}

export default function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormSelectProps<TFieldValues, TName>) {
  const { options, placeholder = "Select an option...", ...fieldProps } = props;

  return (
    <FormField {...fieldProps}>
      {({ value, onChange, isInvalid, id }) => (
        <Select
          value={value ?? null}
          onChange={(key) => onChange(key ?? "")}
          isInvalid={isInvalid}
          className="w-full"
        >
          <SelectTrigger id={id}>
            <SelectValue>{placeholder}</SelectValue>
          </SelectTrigger>
          <SelectPopover>
            <SelectList items={options}>
              {(item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              )}
            </SelectList>
          </SelectPopover>
        </Select>
      )}
    </FormField>
  );
}