"use client";

import clsx from "clsx";

import { Button } from "@/src/shared/model/shadcn/ui/button";
import { Input } from "@/src/shared/model/shadcn/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormValues } from "../types/index";

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

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginFormValues>();

  const hanLogin: SubmitHandler<ILoginFormValues> = (data) => {
    console.log(data);
  };

  // check that inputs are not free
  const userNameInp = watch("username")?.trim().length;
  const passwordInp = watch("password")?.trim().length;

  return (
    <form
      onSubmit={handleSubmit(hanLogin)}
      className="flex flex-col justify-between gap-[50px]"
    >
      <div className="flex flex-col gap-3">
        {inpList.map((e) => {
          return (
            <div key={e.name} className="relative rounded-md border group">
              <span
                className={clsx(
                  "group-focus-within:top-0 group-focus-within:text-[14px] pointer-events-none duration-300 px-2",
                  (e.name == "username" && !userNameInp) ||
                    (e.name == "password" && !passwordInp)
                    ? "bg-[#fff] absolute left-0 top-3 ml-2 text-[#857a7a] text-[16px] truncate z-20"
                    : // userNameInp &&
                      "bg-[#fff] absolute left-0 top-0 ml-2 px-2 text-[#857a7a] text-[14px] truncate z-20",
                )}
              >
                {e.placeholder}
              </span>
              <Input
                {...register(e.name as "username" | "password")}
                className="p-[20px] w-full border-none bg-[#fff] text-[18px] relative z-10 outline-none pt-[30px]"
                type={e.name === "password" ? "password" : "text"}
              />
            </div>
          );
        })}
      </div>
      <Button
        type="submit"
        className="rounded-[10px] p-[16px_32px] font-[500] text-[16px]"
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
