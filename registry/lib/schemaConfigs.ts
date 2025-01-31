import { z } from "zod";

type ZodTypeWithRefine = z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;

export interface BaseConfig<T = any> {
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  optional?: boolean;
  hidden?: boolean;
  default?: any;
  onImageLoad?: (value: { file: File; previewUrl: string }) => void;
  previewClassName?: string;
  uploadAreaClassName?: string;
  metadata?: T;
  rules?: {
    required?: {
      value: boolean;
      message: string;
    };
  };
}

export type TextConfig = BaseConfig & {
  type?: "text";
  textType?: "small" | "huge" | "number" | "password";
};

export type NumberConfig = BaseConfig & {
  type?: "number";
};

export type DateConfig = BaseConfig & {
  type?: "date" | "datetime-local";
};

export type SelectConfig = BaseConfig & {
  type?: "select";
  options?: { value: string | number; label: string }[];
};

export type ImageConfig = BaseConfig & {
  type?: "image";
  onImageLoad?: (value: { file: File; previewUrl: string }) => void;
  previewClassName?: string;
  uploadAreaClassName?: string;
};

export type FieldConfig =
  | TextConfig
  | NumberConfig
  | DateConfig
  | SelectConfig
  | ImageConfig;

export function createFieldConfigs<T extends ZodTypeWithRefine>(
  schema: T,
  configs: {
    [K in keyof z.infer<T>]?: FieldConfig;
  }
) {
  return configs;
}
