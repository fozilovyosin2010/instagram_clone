"use client";

import { Button } from "@/src/shared/model/shadcn/ui/button";
import { Input } from "@/src/shared/model/shadcn/ui/input";

import { useForm } from "react-hook-form";

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
  } = useForm();

  function hanLogin(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(hanLogin)}
      className="flex flex-col justify-between gap-[50px]"
    >
      {/* here  fix it*/}

      {/* <input type="text" {...register("username")} /> */}
      <div className="flex flex-col gap-3">
        {inpList.map((e) => {
          return (
            <div key={e.name} className="relative rounded-md border group">
              <span className="group-focus-within:-top-3 px-2 pointer-events-none duration-300 bg-[#fff] absolute left-0 top-2 h-[20px] ml-2 text-[#857a7a] text-[16px] truncate z-20">
                {e.placeholder}
              </span>
              <Input
                {...register(e.name)}
                className="p-[20px] w-full border-none group-focus-within:pt-[25px] bg-[#fff] relative z-10"
                type={e.name === "password" ? "password" : "text"}
              />
            </div>
          );
        })}
      </div>
      <Button className="rounded-[10px] p-[16px_32px] font-[500] text-[16px]">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
