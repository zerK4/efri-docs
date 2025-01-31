import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { SharedFormFieldProps } from "../form";

function BooleanField({
  config,
  label,
  isOptional,
  control,
  fieldName,
}: SharedFormFieldProps<"boolean">) {
  return (
    <FormField
      key={fieldName}
      control={control}
      name={fieldName}
      rules={config.rules}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", config.className)}>
          <div className='flex items-center gap-2'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={config.inputClassName}
              />
            </FormControl>
            <FormLabel className={config.labelClassName}>
              {label}
              {isOptional && (
                <span className='ml-1 text-muted-foreground'>(Optional)</span>
              )}
            </FormLabel>
          </div>
          <div className='space-y-1 leading-none'>
            {config.description && (
              <FormDescription>{config.description}</FormDescription>
            )}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export default BooleanField;
