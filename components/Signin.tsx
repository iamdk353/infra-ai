"use client";

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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { LucideLoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignUp = () => {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoad(true);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, action: "signup" }),
      });

      const result = await res.json();

      if (!res.ok) {
        setLoad(false);
        toast.error(result.error || "Signup failed");
        return;
      }

      toast.success("Signup successful!");
      console.log("Token:", result.token);
      localStorage.setItem("token", result.token);
      setLoad(false);
      router.push("/app");
    } catch (err: any) {
      toast.error("Something went wrong");
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xs w-full flex flex-col items-center">
        <p className="my-8 text-xl font-bold tracking-tight">
          Sign up for Shadcn UI Blocks
        </p>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full flex text-center"
              disabled={load}
            >
              {load ? (
                <LucideLoaderCircle className="animate-spin" />
              ) : (
                "Continue with Email"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-5 text-sm text-center">
          Already have an account?
          <Link href="/login" className="ml-1 underline text-muted-foreground">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
