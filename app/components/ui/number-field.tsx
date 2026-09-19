// app/components/ui/number-field.tsx
import * as React from "react";
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";
import { FieldGroup } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Minus, Plus } from "lucide-react";

export type NumberFieldProps = Omit<AriaNumberFieldProps, "children"> & {
  placeholder?: string;
  inputId?: string;
  className?: string;
};

export function NumberField({
  placeholder,
  inputId,
  className,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField {...props} className={className}>
      <FieldGroup className="flex-row items-center gap-1">
        <Button
          slot="decrement"
          variant="outline"
          size="icon"
          aria-label="Decrease"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input id={inputId} placeholder={placeholder} className="text-center" />
        <Button
          slot="increment"
          variant="outline"
          size="icon"
          aria-label="Increase"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </FieldGroup>
    </AriaNumberField>
  );
}