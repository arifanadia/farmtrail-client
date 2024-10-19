"use client";
import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginSchema } from "@/lib/validation";


const LoginForm = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
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
          <Button type="submit" className="outline-btn-light mt-6 w-full px-6 py-3 base-bold ">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="mt-6 small-regular lg:base-regular">
        Don&apos;t have an account? Please <Link href={'/auth/register'} className="underline text-light_green">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
