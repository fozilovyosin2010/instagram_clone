import { SubmitHandler, useForm } from "react-hook-form";

import {
  ILoginFormValues,
  IresAuth,
  loginSchema,
  useLoginMutation,
} from "@/src/features/auth";

import { zodResolver } from "@hookform/resolvers/zod";

import { IaccElem, IRegisterFormValues, registerSchema } from "../types/type";
import { useRegisterMutation } from "../api/authApi";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { useToast } from "@/src/shared/hooks";
import { IaccountObj_Schema, validObjSchema } from "../../guard/types/type";
import axios from "axios";

// here check the code and then continue useActionBtn.ts
const useAuth = (formType: "login" | "register") => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<any>({
    resolver: zodResolver(formType === "login" ? loginSchema : registerSchema),
  });

  const router = useRouter();

  async function getProfileImg(token: string): Promise<string | null> {
    const { sid } = jwtDecode<{ sid: string }>(token);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/UserProfile/get-user-profile-by-id?id=${sid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data.data?.image);

      return data.data.image;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async function saveToken(token: string) {
    const storageKey = "instagram_clone";

    const { sid, name, exp } = jwtDecode<{
      sid: string;
      name: string;
      exp: number;
    }>(token);

    const img = await getProfileImg(token);

    const userObj = { sid, name, token, exp: exp * 1000, profileImg: img };

    const accounts = localStorage.getItem(storageKey);

    let obj: IaccountObj_Schema = { currentId: sid, acc_s: [userObj] };

    if (accounts) {
      try {
        const parsedObj = validObjSchema.safeParse(JSON.parse(accounts));

        if (parsedObj.success) {
          obj = parsedObj.data;

          const dubElem = obj["acc_s"].find((e: IaccElem) => e.sid === sid);

          const isDublicate = !!dubElem;

          if (isDublicate && exp * 1000 >= dubElem.exp) {
            // if the account is dublicate, but the expireDate is longer then put it
            obj.acc_s = obj.acc_s.map((e: IaccElem) =>
              // e.sid === sid ? { sid, name, token, exp: exp * 1000 } : e,
              e.sid === sid ? userObj : e,
            );
          } else if (!isDublicate) {
            // if the account isn't dublicate, then add it
            obj.acc_s = [...obj.acc_s, userObj];
          }
          obj.currentId = sid;
        } else {
          console.log(parsedObj.error);
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.log(error);

        localStorage.removeItem(storageKey);
      }
    }

    localStorage.setItem(storageKey, JSON.stringify(obj));
  }

  const [loginUser] = useLoginMutation();
  const [registerUser] = useRegisterMutation();

  // Toaster
  const { errorToast, successToast, infoToast } = useToast();

  const handleError = (title: string, error: IresAuth) => {
    console.log(error);

    const errorMessage = (error as IresAuth).data?.errors?.join(" ") ?? "";

    errorToast(title);
    infoToast(errorMessage);
  };

  const hanRegister: SubmitHandler<IRegisterFormValues> = async (e) => {
    try {
      await registerUser(e).unwrap();

      const obj = {
        username: e.username.trim(),
        password: e.password.trim(),
      };

      await hanLogin(obj);
    } catch (error) {
      // const errorMessage = (error as IresAuth).data.errors?.join(" ") ?? "";
      // console.log(errorMessage);

      // errorToast("register failed!");
      // infoToast(errorMessage);

      handleError("Register failed!", error as IresAuth);
    }
  };

  const hanLogin: SubmitHandler<ILoginFormValues> = async (e) => {
    const obj = {
      username: e.username.trim(),
      password: e.password.trim(),
    };
    try {
      const { data } = await loginUser(obj).unwrap();

      saveToken(data);

      successToast("You are successfully logged in!");

      router.push("/");
    } catch (error) {
      console.log(error);

      handleError("Login failed!", error as IresAuth);
    }
  };

  return {
    isSubmitting,
    control,
    onSubmit: handleSubmit(formType === "login" ? hanLogin : hanRegister),
  };
};

export default useAuth;
