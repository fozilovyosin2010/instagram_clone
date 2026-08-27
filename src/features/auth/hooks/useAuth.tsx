import { CustomToaster } from "@/src/shared/components/custom/Toaster/Toaster";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  ILoginFormValues,
  IresLogin,
  loginSchema,
  useLoginMutation,
} from "../index";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CircleCheck, CircleX } from "lucide-react";

const useAuth = (formType: "login" | "register") => {
  // here make another schema for register
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<ILoginFormValues | any>({
    resolver: zodResolver(loginSchema),
  });

  function saveToken(token: string, exp: number) {
    const months = 1000 * 60 * 60 * 24 * 30;

    document.cookie = `auth_token=${token}; max-age=${months * exp}; same-site=strict; secure`;
  }

  const [loginUser] = useLoginMutation();

  const hanLogin: SubmitHandler<ILoginFormValues> = async (e) => {
    try {
      console.log(e);

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
    } catch (error) {
      if ((error as IresLogin).data?.errors) {
        const errorMessage: string | any = (
          error as IresLogin
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
    onSubmit: formType === "login" ? handleSubmit(hanLogin) : undefined,
  };
};

export default useAuth;
