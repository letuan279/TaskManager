"use client";

import Image from "next/image";
import AuthLayout from "../layout";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Register() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    router.push("/auth/login");
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex justify-center items-center gap-2 text-4xl font-semibold">
          <Image src={logo} alt="logo" height={32} />
          <div>Trackit</div>
        </div>
        <div className="rounded-md border shadow-md p-8 space-y-8 w-1/3">
          <div className="w-full text-center text-2xl">Register</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full bg-[#C3C3C3] hover:bg-[#C3C3C3]/90"
              >
                Register
              </Button>
            </form>
          </Form>
        </div>
        <Link
          href="/auth/login"
          className="w-5/12 mt-4 p-2 hover:bg-secondary text-center border-black border rounded-full"
        >
          Do you already have an account?
        </Link>
      </div>
    </AuthLayout>
  );
}
