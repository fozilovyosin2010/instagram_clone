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
import { IRegisterFormValues, registerSchema } from "../types/type";
import { useRegisterMutation } from "../api/authApi";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { setToken } from "@/src/shared/utils/logic";

const useAuth = (formType: "login" | "register") => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<ILoginFormValues | any>({
    resolver: zodResolver(formType === "login" ? loginSchema : registerSchema),
  });

  const router = useRouter();

  // here optimize the code
  function saveToken(token: string, exp1: number) {
    const expire = 24 * 30 * exp1;
    //  here
    // goal: to make multi account, user could choose in which logged account to enter
    const accounts = localStorage["accounts_instagram_clone"] || null;
    const { sid, name, exp } = jwtDecode<{
      sid: string;
      name: string;
      exp: number;
    }>(token);

    let arr = JSON.parse(accounts) || [];

    const dubElem: { sid: string; name: string; exp: number } = arr.find(
      (e: { sid: string; name: string; exp: number }) => e.sid === sid,
    );
    console.log(dubElem);

    const isDublicate = !!dubElem;

    if (!isDublicate) arr.push({ sid, name, token, exp });
    // changing the obj if its expireDate is longer
    else if (isDublicate && dubElem.exp < exp) {
      const arr2 = arr.map((e: any) =>
        e.sid === dubElem.sid ? { sid, name, token, exp } : e,
      );

      arr = [...arr2];
    }

    localStorage.setItem("accounts_instagram_clone", JSON.stringify(arr));

    setToken(token);
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

  const hanLogin: SubmitHandler<ILoginFormValues> = async (e) => {
    try {
      const { data } = await loginUser(e).unwrap();
      // expire token after 12 months

      saveToken(
        data,
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwZjdhYzlhOC1iMzk3LTRjOGYtYWMwMy00MjMwY2E4ZTkyMjciLCJuYW1lIjoicGV0ZXIiLCJlbWFpbCI6ImZ3aWpvd2VAZ21haWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc4NzkzOTE1MiwiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.TK5ZOwiC1ejSe9uocty_mfdkoFEYtq4cLc9b0R9fIz4",
        12,
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
