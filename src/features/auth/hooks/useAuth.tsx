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
            id: `register-toast-error-${formType}`,
          },
        );
      }
    }
  };
  // here logic before pushing
  const hanLogin: SubmitHandler<ILoginFormValues> = async (e) => {
    try {
      //  .trim() for fields
      for (const key in e) {
        const keyList = key as keyof typeof e;
        e[keyList] = e[keyList].trim();
      }
      const { data } = await loginUser(e).unwrap();

      saveToken(
        data,
        // miran
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI4YzU1MjUzOC00NGZmLTQ0ODMtODE2YS1kYmM5YmE1NzM5MmEiLCJuYW1lIjoibWlyYW4iLCJlbWFpbCI6ImVmd2lvamZAZ21haWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc4ODAxNDI3NSwiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.xjR1p2ZfojXlQ04frm8EadJ23ZnsTqR9dDdD3iRgPeg",
        // peter
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwZjdhYzlhOC1iMzk3LTRjOGYtYWMwMy00MjMwY2E4ZTkyMjciLCJuYW1lIjoicGV0ZXIiLCJlbWFpbCI6ImZ3aWpvd2VAZ21haWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc5MDE5MjMwNDIwNSwiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.62OqPU8J7vEq5A2mviDZ-omGO5RjQWPWYpIGc3KtO5M",
      );
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
          id: `auth-toast-success-${formType}`,
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
            id: `login-toast-error-${formType}`,
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
