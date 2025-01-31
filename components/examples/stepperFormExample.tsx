"use client";

import MultistepForm, {
  StepConfig,
} from "@/registry/components/forms/multiStepForm";
import { userSchema, userSchema2 } from "@/schema/userSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

function StepperFormExample() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const userForm = useForm<z.infer<typeof userSchema>>({
    defaultValues: {
      name: "",
    },
  });
  const userForm2 = useForm<z.infer<typeof userSchema2>>({
    defaultValues: {
      email: "",
    },
  });

  const steps: StepConfig[] = [
    {
      title: "Name",
      form: userForm,
      schema: userSchema,
      component: (
        <Form {...userForm}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ),
    },
    {
      title: "Email",
      form: userForm2,
      schema: userSchema2,
      component: (
        <Form {...userForm2}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ),
    },
    {
      title: "Creating...",
      component: null,
    },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    console.log("first");
    toast.success(
      JSON.stringify(
        {
          ...userForm.getValues(),
          ...userForm2.getValues(),
        },
        null,
        2
      )
    );

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className='p-20 rounded-xl border my-4'>
      <MultistepForm
        onSubmit={async () => handleSubmit()}
        header={
          <div className='my-4'>
            <h2 className='text-2xl !p-0 !m-0 font-semibold'>
              Create a new user
            </h2>
          </div>
        }
        isSuccess={success}
        isPending={loading}
        steps={steps}
      />
    </div>
  );
}

export default StepperFormExample;
