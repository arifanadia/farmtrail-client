"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "./CustomButton";
import { Textarea } from "./ui/textarea";

// Define form schema with validation for name, email, and message
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // You can send form data to an API here
  }

  return (
    <div className="bg-[#272727] p-16">
      <h3 className="h3-bold text-28 mb-8">Contact Us</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-2">Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your Name" {...field} className="w-[300px] h-12 bg-transparent text-white border-light-br placeholder:text-gray-400 focus:border-light_green"/>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-2">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email" {...field} className="w-[300px] h-12 bg-transparent text-white border-light-br placeholder:text-gray-400 focus:border-light_green"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-2">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your Message"
                    {...field}
                    className="h-40 bg-transparent text-white border-light-br placeholder:text-gray-400 focus:border-light_green"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomButton title="Submit" type="submit" label="Submit" className="w-full h-14" />
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
