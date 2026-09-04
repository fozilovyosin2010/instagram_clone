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

const useAuth = (formType: "login" | "register") => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<ILoginFormValues | any>({
    resolver: zodResolver(formType === "login" ? loginSchema : registerSchema),
  });

  const router = useRouter();

  function saveToken(token: string, exp: number) {
    const months = 1000 * 60 * 60 * 24 * 30;

    const obj = { acces_token: token };

    document.cookie = `auth_token=${JSON.stringify(obj)}; max-age=${months * exp}; same-site=strict; secure`;
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
      // expire token after 6 months
      saveToken(data, 6);

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
