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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // Use next/navigation for navigation
import { loginUser } from "@/lib/store/features/authentication/authSlice";
import { AppDispatch } from "@/lib/store/store";
import { toast } from "sonner";

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter(); // Initialize router for navigation

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("login successful");
      router.push("/products");
    } else {
      console.error(resultAction.error);
    }
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
          <Button
            type="submit"
            className="outline-btn-light mt-6 w-full px-6 py-3 base-bold"
          >
            Sign In
          </Button>
        </form>
      </Form>
      <div className="mt-6 small-regular lg:base-regular">
        Don&apos;t have an account? Please{" "}
        <Link href={"/auth/register"} className="underline text-light_green">
          Sign up
        </Link>
      </div>
      <div className="hidden lg:block absolute right-5 top-1/2 bg-white bg-opacity-15 backdrop-blur-md  border-2 border-light_green p-6 space-y-3 mt-3">
        <span>you can try free user Experience By :</span>
        <p>Demo Email: arifa@nadia00.com </p>
        <p>Demo Password: 123456Ab</p>
      </div>
    </div>
  );
};

export default LoginForm;
