"use client";

import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

// Define form schema using zod for validation
const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username is too short")
    .max(50, "Username is too long"),
});

const RegisterForm = () => {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    {...field}
                    className="max-w-md lg:w-[350px] border-0 border-b-2 border-light-br text-light-2 text-opacity-50 hover:border-2 hover:text-light-1 hover:border-light-1 transition-all p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your Photo url"
                    {...field}
                    className="max-w-md lg:w-[350px] border-0 border-b-2 border-light-br text-light-2 text-opacity-50 hover:border-2 hover:text-light-1 hover:border-light-1 transition-all p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="developer@arifa.pro"
                    {...field}
                    className="max-w-md lg:w-[350px] border-0 border-b-2 border-light-br text-light-2 text-opacity-50 hover:border-2 hover:text-light-1 hover:border-light-1 transition-all p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                     className="max-w-md lg:w-[350px] border-0 border-b-2 border-light-br text-light-2 text-opacity-50 hover:border-2 hover:text-light-1 hover:border-light-1 transition-all p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-6 w-full text-white hover:text-light-1 bg-light_green bg-opacity-90 hover:border-2 hover:border-light_green px-6 py-3 base-bold transition-all ease-in">
            Submit
          </Button>
        </form>
      </Form>
      <div className="mt-6 small-regular lg:base-regular">
       Already have an account? Please <Link href={'/auth/login'} className="underline text-light_green">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
