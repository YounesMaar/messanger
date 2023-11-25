"use client";

import Input from "@/components/form/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/form/Button";
import AuthSocialButton from "@/components/auth/AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = ({}) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status]);

  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (data) => {
      if (variant === "REGISTER") {
        axios.post("/api/register", data);
      }
      if (variant === "LOGIN") {
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok) {
            toast.success("Logged in");
          }
        });
      }
    },
    onError: () => {
      toast.error("something went wrong");
    },
    onSuccess: () => {
      router.push("/users");
    },
  });

  const { mutate: socialAction, isPending: isLoading } = useMutation({
    mutationFn: async (action: string) => {
      signIn(action, { redirect: false }).then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        } else if (callback?.ok) {
          toast.success("Logged in");
        }
      });
    },
    onError: () => {
      toast.error("something went wrong");
    },
    onSuccess: () => {
      router.push("/users");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    submit(data);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              type="text"
              label="Name"
              placeholder="Name"
              register={register}
              id="name"
              errors={errors}
              disabled={isPending}
            />
          )}
          <Input
            type="text"
            label="Email"
            placeholder="Email"
            register={register}
            id="email"
            errors={errors}
            disabled={isPending}
            required
          />
          <Input
            required
            type="password"
            label="Password"
            placeholder="Password"
            register={register}
            id="password"
            errors={errors}
            disabled={isPending}
          />
          <div>
            <Button disabled={isPending} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2 ">
            <AuthSocialButton
              icon={FaGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={FcGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messanger ?"
              : "Already have an account ?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
