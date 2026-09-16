import { CustomToaster } from "@/src/shared/components/custom/Toaster/Toaster";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  ILoginFormValues,
  IresAuth,
  loginSchema,
  useLoginMutation,
} from "@/src/features/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CircleCheck, CircleX } from "lucide-react";
import { IaccElem, IRegisterFormValues, registerSchema } from "../types/type";
import { useRegisterMutation } from "../api/authApi";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

const useAuth = (formType: "login" | "register") => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<ILoginFormValues | any>({
    resolver: zodResolver(formType === "login" ? loginSchema : registerSchema),
  });

  const router = useRouter();

  // HERE correct login logic
  function saveToken(token: string) {
    const localKey = "instagram_clone";

    const { sid, name, exp } = jwtDecode<{
      sid: string;
      name: string;
      exp: number;
    }>(token);

    const accounts = localStorage[localKey] || null;

    let obj = JSON.parse(accounts) || {};

    if (!accounts) {
      obj = {
        currentId: sid,
        acc_s: [{ sid, name, token, exp: exp * 1000 }],
      };
    } else {
      const dubElem = obj["acc_s"].find((e: IaccElem) => e.sid === sid);

      const isDublicate = !!dubElem;

      if (isDublicate && exp * 1000 >= dubElem.exp) {
        // if the account is dublicate, but the expireDate is longer then put it
        obj["acc_s"] = obj["acc_s"].map((e: IaccElem) =>
          e.sid === sid ? { ...e, exp: exp * 1000, token, sid } : e,
        );
      } else if (!isDublicate) {
        // if the account isn't dublicate, then add it
        obj["acc_s"].push({ sid, name, token, exp: exp * 1000 });
      }
      obj.currentId = sid;
    }

    localStorage.setItem(localKey, JSON.stringify(obj));
  }

  const [loginUser] = useLoginMutation();
  const [registerUser] = useRegisterMutation();

  const hanRegister: SubmitHandler<IRegisterFormValues> = async (e) => {
    try {
      await registerUser(e).unwrap();

      const obj = {
        username: e.username,
        password: e.password,
      };

      await hanLogin(obj);
    } catch (error) {
      if ((error as IresAuth).data?.errors) {
        const errorMessage: string | any = (
          error as IresAuth
        ).data.errors?.join(" ");
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
          // prevents from dublication & formType to seperate login/register
          {
            id: `login-toast-success-${formType}`,
          },
        );
      }
    }
  };
  // here logic before pushing
  const hanLogin: SubmitHandler<ILoginFormValues> = async (
    e = { username: "oeiioge", password: "fwjrigeiru" },
  ) => {
    try {
      //  .trim() for fields
      for (const key in e) {
        const keyList = key as keyof typeof e;
        e[keyList] = e[keyList].trim();
      }
      const { data } = await loginUser(e).unwrap();

      saveToken(data);
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
        // prevents from dublication & formType to seperate login/register
        {
          id: `login-toast-error-${formType}`,
        },
      );

      router.push("/");
    } catch (error) {
      if ((error as IresAuth).data?.errors) {
        const errorMessage: string | any = (
          error as IresAuth
        ).data.errors?.join(" ");
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
          // prevents from dublication & formType to seperate login/register
          {
            id: `login-toast-success-${formType}`,
          },
        );
      }
    }
  };

  return {
    isSubmitting,
    control,
    onSubmit: handleSubmit(formType === "login" ? hanLogin : hanRegister),
  };
};

export default useAuth;
