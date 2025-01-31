"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FieldConfig } from "@/lib/schemaConfigs";
import { magicRename } from "@/lib/sharedFormUtils";
import React from "react";
import { Control, SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import BooleanField from "./components/booleanField";
import DateField from "./components/dateField";
import ImageField from "./components/imageField";
import NumberField from "./components/numberField";
import SelectField from "./components/selectField";
import TextField from "./components/textField";
import TextareaField from "./components/textareaField";

export type FieldConfigs = Record<string, FieldConfig>;

export type SharedFormFieldProps<T extends keyof FieldConfigs> = {
  fieldName: string;
  control: Control<any>;
  config: FieldConfigs[T];
  label: string;
  isOptional?: boolean;
  schema?: any;
};

const renderField = <T extends z.ZodType<any, any>>(
  index: number,
  fieldName: string,
  schema: T,
  control: Control<any>,
  fieldConfigs: FieldConfigs
): React.ReactNode => {
  const config = fieldConfigs[fieldName] || {};
  const label = config.label || magicRename(fieldName);

  // Check if the field should be hidden
  if (config.hidden) {
    return null;
  }

  // Determine if the field is optional
  const isOptional =
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault ||
    config.optional;

  // Unwrap optional/nullable schemas
  const baseSchema =
    schema instanceof z.ZodOptional || schema instanceof z.ZodNullable
      ? schema._def.innerType
      : schema;

  if (config.type === "image") {
    return (
      <ImageField
        schema={baseSchema}
        key={index}
        fieldName={fieldName}
        control={control}
        config={config}
        isOptional={isOptional}
        label={label}
      />
    );
  }

  if (config.type === "select" || baseSchema instanceof z.ZodEnum) {
    return (
      <SelectField
        key={index}
        config={config}
        isOptional={isOptional}
        label={label}
        fieldName={fieldName}
        control={control}
        schema={schema}
      />
    );
  }

  // Date handling for datetime schemas
  if (baseSchema instanceof z.ZodDate) {
    return (
      <DateField
        key={index}
        config={config}
        isOptional={isOptional}
        label={label}
        fieldName={fieldName}
        control={control}
        schema={baseSchema}
      />
    );
  }

  // String input
  if (
    baseSchema instanceof z.ZodString &&
    config.type === "text" &&
    config.textType !== "huge" &&
    config.textType !== "number"
  ) {
    return (
      <TextField
        key={index}
        fieldName={fieldName}
        control={control}
        config={config}
        isOptional={isOptional}
        label={label}
        schema={baseSchema}
      />
    );
  }

  // String input
  if (
    baseSchema instanceof z.ZodString &&
    config.type === "text" &&
    config.textType === "huge"
  ) {
    return (
      <TextareaField
        key={index}
        fieldName={fieldName}
        control={control}
        config={config}
        isOptional={isOptional}
        label={label}
        schema={baseSchema}
      />
    );
  }

  // Number input
  if (
    baseSchema instanceof z.ZodNumber ||
    config.type === "number" ||
    (config.type === "text" && config.textType === "number")
  ) {
    return (
      <NumberField
        key={index}
        config={config}
        isOptional={isOptional}
        label={label}
        fieldName={fieldName}
        control={control}
        schema={baseSchema}
      />
    );
  }

  // Boolean (Checkbox)
  if (baseSchema instanceof z.ZodBoolean) {
    return (
      <BooleanField
        key={index}
        config={config}
        isOptional={isOptional}
        label={label}
        fieldName={fieldName}
        control={control}
        schema={baseSchema}
      />
    );
  }

  return null;
};

interface UniversalFormProps<
  T extends z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>
> {
  schema: T;
  onSubmit: SubmitHandler<z.infer<T>>;
  fieldConfigs?: FieldConfigs;
  submitButtonText?: string;
  formClassName?: string;
  submitButtonClassName?: string;
  form: UseFormReturn<z.infer<T>>;
  showSeparator?: boolean;
}

function SharedForm<
  T extends z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>
>({
  schema,
  onSubmit,
  fieldConfigs = {},
  submitButtonText = "Submit",
  formClassName = "flex flex-col gap-4",
  submitButtonClassName,
  form,
  showSeparator = false,
}: UniversalFormProps<T>) {
  const schemaShape =
    "shape" in schema ? schema.shape : schema._def.schema.shape;

  return (
    <Form {...form}>
      <form
        id={`shared-form-${schema._def.description}`}
        onSubmit={form?.handleSubmit(onSubmit)}
        className={formClassName}
      >
        {Object.keys(schemaShape).map((fieldName, index) => {
          const fieldSchema = schemaShape[fieldName];
          const config = fieldConfigs[fieldName] || {};

          if (!config.hidden) {
            return renderField<typeof fieldSchema>(
              index,
              fieldName,
              fieldSchema,
              form.control,
              fieldConfigs
            );
          }

          return null;
        })}
      </form>
      {showSeparator && <Separator />}
      <div className='flex justify-end'>
        <Button
          form={`shared-form-${schema._def.description}`}
          type='submit'
          className={submitButtonClassName}
        >
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
}

export default SharedForm;
