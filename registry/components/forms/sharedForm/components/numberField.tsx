import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { SharedFormFieldProps } from "../form";

function NumberField({
  config,
  label,
  isOptional,
  control,
  fieldName,
}: SharedFormFieldProps<"number">) {
  return (
    <FormField
      key={fieldName}
      control={control}
      rules={config.rules}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", config.className)}>
          <FormLabel className={config.labelClassName}>
            {label}
            {isOptional && (
              <span className='ml-1 text-muted-foreground'>(Optional)</span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type='text'
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^-?\d*[.,]?\d*$/.test(value)) {
                  field.onChange(
                    config.type !== "text" ? Number(value) : value
                  );
                }
              }}
              className={config.inputClassName}
              placeholder={config.placeholder}
            />
          </FormControl>
          {config.description && (
            <FormDescription>{config.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default NumberField;
