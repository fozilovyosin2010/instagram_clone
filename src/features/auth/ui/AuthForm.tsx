"use client";

import clsx from "clsx";

import { Button } from "@/src/shared/components/index";

import { LoaderCircle } from "lucide-react";

import useAuth from "@/src/features/auth/hooks/useAuth";
import { IauthForm } from "@/src/features/auth/types/type";
import TextFieldForm from "./TextFieldForm";
import { Controller } from "react-hook-form";

export const AuthForm = ({ formType, inpFields, btnSubmit }: IauthForm) => {
  // here make a flex auth
  const { isSubmitting, onSubmit, control } = useAuth(formType);

  console.log("render");

  return (
    <form
      method="POST"
      onSubmit={onSubmit as any}
      className="flex flex-col justify-between gap-[50px]"
    >
      <div className="flex flex-col gap-3">
        {inpFields.map((e, i) => {
          return (
            <Controller
              key={`${e.name}-${i}`}
              name={e.name}
              control={control}
              render={({ field, fieldState }) => (
                <TextFieldForm
                  errorMessage={fieldState.error?.message}
                  type={e.type}
                  label={e.label}
                  field={field}
                />
              )}
            />
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
