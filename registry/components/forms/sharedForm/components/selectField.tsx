import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { SharedFormFieldProps } from "../form";

function SelectField({
  fieldName,
  control,
  config,
  label,
  isOptional,
  schema,
}: SharedFormFieldProps<"select">) {
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
            <Select
              onValueChange={(e) =>
                schema instanceof z.ZodNumber
                  ? field.onChange(Number(e))
                  : field.onChange(e)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.options?.map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default SelectField;
