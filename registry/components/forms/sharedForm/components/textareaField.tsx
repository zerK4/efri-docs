import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { SharedFormFieldProps } from "../form";

function TextareaField({
  config,
  label,
  isOptional,
  control,
  fieldName,
}: SharedFormFieldProps<"text">) {
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
            <Textarea
              placeholder={config.placeholder || `Enter ${label}`}
              {...field}
              className={config.inputClassName}
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

export default TextareaField;
