"use client";

import { sharedFormUserSchema, userConfigs } from "@/schema/userSchema";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SharedForm from "./forms/sharedForm/form";
import { Separator } from "./ui/separator";

function SharedFormPreview() {
  const form = useForm<z.infer<typeof sharedFormUserSchema>>({
    resolver: zodResolver(sharedFormUserSchema),
    defaultValues: {
      age: null,
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className='border rounded-xl mt-4'>
      <div className='px-4'>
        <h2 className='text-2xl font-medium'>Shared Form</h2>
      </div>
      <Separator className='my-4' />
      <div className=''>
        <SharedForm
          showSeparator
          form={form}
          schema={sharedFormUserSchema}
          fieldConfigs={userConfigs()}
          onSubmit={(data) => console.log(data, "the data")}
          formClassName='grid grid-cols-2 gap-4 p-4'
          submitButtonClassName='col-span-2 m-2'
        />
      </div>
    </div>
  );
}

export default SharedFormPreview;
