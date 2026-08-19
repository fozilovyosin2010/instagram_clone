"use client";

import clsx from "clsx";

import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormValues, IresLogin, loginSchema } from "../types/index";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, CustomToaster } from "@/src/shared/components/index";

import { useLoginMutation } from "../../api/index";
import { CircleCheck, CircleX, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const inpList = [
  {
    name: "username",
    placeholder: "Phone number, user name or email",
  },
  {
    name: "password",
    placeholder: "Password",
  },
];

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // check that inputs are not free
  const userNameInp = watch("username")?.trim().length;
  const passwordInp = watch("password")?.trim().length;

  // login
  const [loginUser, { isError, isSuccess }] = useLoginMutation();

  const hanLogin: SubmitHandler<ILoginFormValues> = async (e) => {
    try {
      const { data } = await loginUser(e).unwrap();
      console.log(data);
      if (data)
        toast.custom(
          (t) => (
            <CustomToaster
              type="success"
              icon={<CircleCheck color="#fff" />}
              title="Success"
              des="You are successfully logged in!"
              onClose={() => toast.dismiss(t)}
            />
          ),
          // prevents from dublication
          {
            id: "login-toast-error",
          },
        );
    } catch (error) {
      const errorMessage = (error as IresLogin).data.errors?.join(" ");
      toast.custom(
        (t) => (
          <CustomToaster
            type="error"
            icon={<CircleX />}
            title="Error"
            des={errorMessage as string}
            onClose={() => toast.dismiss(t)}
          />
        ),
        {
          id: "login-toast-success",
          duration: 10000,
        },
      );
    }
  };

  const [isShowingPass, setIsShowingPass] = useState(false);

  function hanTogglePass() {
    setIsShowingPass((e) => !e);
  }

  return (
    <form
      onSubmit={handleSubmit(hanLogin)}
      className="flex flex-col justify-between gap-[50px]"
    >
      <div className="flex flex-col gap-3">
        {inpList.map((e) => {
          return (
            <div key={e.name} className="relative border rounded-md group">
              {/* label */}
              <span
                className={clsx(
                  "group-focus-within:top-0 group-focus-within:text-[14px] pointer-events-none duration-300 truncate max-w-full",
                  (e.name == "username" && !userNameInp) ||
                    (e.name == "password" && !passwordInp)
                    ? "bg-[#fff] absolute left-0 top-4 mx-2 text-[#857a7a] text-[14px] truncate z-20 dark:bg-[rgb(20,20,22)] max-md:top-3"
                    : "bg-[#fffF] absolute left-0 top-0 mx-2 text-[#857a7a] text-[14px] truncate z-20 dark:bg-[rgb(20,20,22)]",
                )}
              >
                <p
                  className={clsx(
                    // if error is true
                    errors?.[e.name as "username" | "password"]?.message &&
                      "text-red-500 ",
                    "font-[600]",
                  )}
                >
                  {errors?.[e.name as "username" | "password"]?.message ||
                    e.placeholder}
                </p>
              </span>
              <div className="flex items-center px-2 bg-[#ff]  rounded-md dark:bg-[rgb(20,20,22)]">
                <input
                  {...register(e.name as "username" | "password")}
                  className="p-2 w-full border-none text-[14px] font-[600] relative z-10 outline-none pt-[20px] bg-transparent max-md:p-1 max-md:pt-[15px]"
                  type={
                    e.name === "password" && !isShowingPass
                      ? "password"
                      : "text"
                  }
                />
                {/* for password */}
                {e.name === "password" && (
                  <span
                    onClick={hanTogglePass}
                    className=" cursor-pointer z-20"
                  >
                    {isShowingPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="submit"
        className="rounded-[10px] p-[16px_32px] font-[600] font-serif text-[14px]"
      >
        Log in
      </Button>
    </form>
  );
};
