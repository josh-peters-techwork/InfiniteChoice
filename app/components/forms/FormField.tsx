import * as React from "react";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "~/components/ui/field";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  description?: string;
  className?: string;
  children: (fieldProps: {
    value: any;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    name: string;
    isInvalid: boolean;
    id: string;
  }) => React.ReactNode;
}

export default function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  className,
  children,
  ...controllerProps
}: FormFieldProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController(controllerProps);

  const id = `test-${field.name.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  return (
    <Field className={className} data-invalid={invalid}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      {children({
        value: field.value,
        onChange: field.onChange,
        onBlur: field.onBlur,
        name: field.name,
        isInvalid: invalid,
        id,
      })}
      {error && <FieldError>{error.message}</FieldError>}
    </Field>
  );
}