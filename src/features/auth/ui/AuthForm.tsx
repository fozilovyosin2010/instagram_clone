"use client";

import clsx from "clsx";

import { Button } from "@/src/shared/components/index";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";

import useAuth from "@/src/features/auth/hooks/useAuth";
import { IauthForm } from "@/src/features/auth/types/type";
import { jwtDecode } from "jwt-decode";

export const AuthForm = ({ formType, inpFields, btnSubmit }: IauthForm) => {
  // here make a flex auth
  const { register, errors, isSubmitting, watch, onSubmit } = useAuth(formType);

  // check that inputs are not free

  const userNameInp = watch("username")?.trim().length;
  const passwordInp = watch("password")?.trim().length;

  const [isShowingPass, setIsShowingPass] = useState(false);

  function hanTogglePass() {
    setIsShowingPass((e) => !e);
  }

  return (
    <form
      onSubmit={onSubmit as any}
      className="flex flex-col justify-between gap-[50px]"
    >
      <div className="flex flex-col gap-3">
        {inpFields.map((e) => {
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
                    e.label}
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
                  <button
                    onClick={hanTogglePass}
                    className=" cursor-pointer z-20"
                  >
                    {isShowingPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className={clsx(
          "rounded-[10px] p-[16px_32px] font-[600] font-serif text-[14px]",
          isSubmitting && "opacity-70",
        )}
      >
        <span>{btnSubmit}</span>
        {isSubmitting && <LoaderCircle className="animate-spin" />}
      </Button>
    </form>
  );
};
