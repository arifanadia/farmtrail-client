"use client";
import {  z } from "zod";
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
import { signUpSchema } from "@/lib/validation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "@/lib/store/features/authentication/authSlice";
import { AppDispatch } from "@/lib/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  console.log(router);
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
 });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const {username, email, password } = values;
    console.log(values);
    

    const resultAction = await dispatch(registerUser({ username, email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("Registration successful!");
      router.push('/products')
 
      // Handle successful registration
    } else if (registerUser.rejected.match(resultAction)) {
      const errorMessage = resultAction.payload?.errorMessage || 'An unknown error occurred';
      setError(errorMessage);
  }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="confirm password"
                    {...field}
                    className="max-w-md lg:w-[350px] border-0 border-b-2 border-light-br text-light-2 text-opacity-50 hover:border-2 hover:text-light-1 hover:border-light-1 transition-all p-6"
                  />
                </FormControl>
                <FormMessage className="text-error" />
              </FormItem>
            )}
          />
          <Button type="submit" className="outline-btn-light mt-6 w-full px-6 py-3 base-bold">
            Sign Up
          </Button>
        </form>
      </Form>
      {error && <div className="text-error">{error}</div>}
      <div className="mt-6 small-regular lg:base-regular">
       Already have an account? Please <Link href={'/auth/login'} className="underline text-light_green">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
