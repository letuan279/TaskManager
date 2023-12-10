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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/userSlice";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Login() {
  const [hide, setHide] = useState(true);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        router.push("/");
        toast.success("Login was successful");
      })
      .catch((error) => {
        toast.error(
          error.message || "It seems like something error is happening!"
        );
      });
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex justify-center items-center gap-2 text-4xl font-semibold">
          <Image src={logo} alt="logo" height={32} />
          <div>Trackit</div>
        </div>
        <div className="rounded-md border shadow-md p-8 space-y-8 w-1/3">
          <div className="w-full text-center text-2xl">Login</div>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex justify-between items-center">
                        <div>Password</div>
                        <div
                          className="flex items-center gap-1 hover:underline hover:cursor-pointer"
                          onClick={() => setHide(!hide)}
                        >
                          {hide ? <EyeOff height={20} /> : <Eye height={20} />}
                        </div>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        type={hide ? "password" : "text"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full bg-[#C3C3C3] hover:bg-[#C3C3C3]/90"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
        <Link
          href="/auth/register"
          className="w-5/12 mt-4 p-2 hover:bg-secondary text-center border-black border rounded-full"
        >
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
}
