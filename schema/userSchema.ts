import { z } from "zod";
import { createFieldConfigs } from "@/lib/schemaConfigs";

export const userSchema = z.object({
  name: z.string().min(3),
});

export const userSchema2 = z.object({
  email: z.string().email(),
});

export const sharedFormUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  age: z.number().optional().nullable(),
});

export const userConfigs = (
  defaultData?: z.infer<typeof sharedFormUserSchema>
) =>
  createFieldConfigs(sharedFormUserSchema, {
    name: {
      type: "text",
      className: "col-span-2",
      label: "Name",
      placeholder: "Enter your name",
      description: "Please enter your name",
    },
    email: {
      type: "text",
      className: "col-span-2",
      label: "Email",
      placeholder: "Enter your email",
      description: "Please enter your email",
    },
    password: {
      type: "text",
      textType: "password",
      label: "Password",
      placeholder: "Enter your password",
      description: "> 8 characters",
    },
    confirmPassword: {
      type: "text",
      textType: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      description: "Please confirm your password",
    },
    age: {
      label: "Age",
      placeholder: "Enter your age",
      type: "number",
    },
  });
