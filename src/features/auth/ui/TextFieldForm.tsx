"use client";

import clsx from "clsx";

import { Eye, EyeOff } from "lucide-react";

import { useRef, useState } from "react";

import { ItextFieldForm } from "../types/type";

const TextFieldForm = ({
  errorMessage,
  label,
  type,
  field,
}: ItextFieldForm) => {
  const [isShowingPass, setIsShowingPass] = useState(false);

  function hanTogglePass() {
    // here
    setIsShowingPass((e) => !e);
  }

  return (
    <div className="relative border rounded-md group">
      {/* label */}
      <span
        className={clsx(
          "group-focus-within:top-0 group-focus-within:text-[14px] pointer-events-none duration-300 truncate max-w-full",
          // here correct the logic
          // (e.name == "username" && !userNameInp) ||
          //   (e.name == "password" && !passwordInp)
          !field?.value?.trim()
            ? "bg-[#fff] absolute left-0 top-4 mx-2 text-[#857a7a] text-[14px] truncate z-20 dark:bg-[rgb(20,20,22)] max-md:top-3"
            : "bg-[#fff] absolute left-0 top-0 mx-2 text-[#857a7a] text-[14px] truncate z-20 dark:bg-[rgb(20,20,22)]",
        )}
      >
        <p
          className={clsx(
            // if error is true
            errorMessage && "text-red-500",
            "font-[600]",
          )}
        >
          {errorMessage || label}
        </p>
      </span>
      <div className="flex items-center px-2 bg-[#fff] rounded-md dark:bg-[rgb(20,20,22)]">
        <input
          {...field}
          value={field?.value ?? ""}
          className="p-2 w-full border-none text-[14px] font-[600] relative z-10 outline-none pt-[20px] bg-transparent max-md:p-1 max-md:pt-[15px]"
          type={
            type === "password" ? (isShowingPass ? "password" : "text") : type
          }
        />
        {/* for password */}
        {type === "password" && (
          <button
            type="button"
            onClick={hanTogglePass}
            className="cursor-pointer z-20"
          >
            {isShowingPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextFieldForm;
