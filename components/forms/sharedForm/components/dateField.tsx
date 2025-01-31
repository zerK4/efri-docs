import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/components/dateTimePicker";
import React from "react";
import { SharedFormFieldProps } from "../form";

function DateField({
  fieldName,
  control,
  config,
  label,
  isOptional,
}: SharedFormFieldProps<"date" | "datetime-local">) {
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
            <DateTimePicker
              cb={(date) => field.onChange(date)}
              defaultDate={field.value}
              disabled={{
                date: new Date(),
                operator: "<=",
              }}
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

export default DateField;
