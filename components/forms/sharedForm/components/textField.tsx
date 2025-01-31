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
import { SharedFormFieldProps } from "../form";

function TextField({
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
          <FormLabel
            className={cn(config.labelClassName, "flex items-center gap-2")}
          >
            {label}
            {isOptional && (
              <span className='ml-1 text-muted-foreground'>(Optional)</span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={config.placeholder || `Enter ${label}`}
              {...field}
              className={config.inputClassName}
              type={
                config.type === "text" && config.textType === "password"
                  ? "password"
                  : ""
              }
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

export default TextField;
