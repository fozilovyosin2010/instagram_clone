import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  IaccountObj_Schema,
  validObjSchema,
} from "@/src/features/guard/types/type";
import axios from "axios";
import { useToast } from "@/src/shared/hooks";

const storageKey = "instagram_clone";

async function validateObj(jsonObj: string) {
  if (!jsonObj) return null;
  try {
    const parsedObj = validObjSchema.safeParse(JSON.parse(jsonObj));

    if (!parsedObj.success) {
      localStorage.removeItem(storageKey);
      return null;
    }

    return await validateTokens(parsedObj.data);
  } catch (error) {
    localStorage.removeItem(storageKey);
    return null;
  }
}

async function getProfile(token: string) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/UserProfile/get-my-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return true;
  } catch (error) {
    // if 401 then false
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log(error);
      return false;
    }
    // else any other error retry
    return await getProfile(token);
  }
}
async function validateTokens(
  obj: IaccountObj_Schema,
): Promise<IaccountObj_Schema | null> {
  // searching for fresh accounts
  const freshAccs = obj.acc_s.filter((e) => e.exp > Date.now());

  if (freshAccs.length === 0) {
    return null;
  }
  // is targeted account expired and does it exist
  const targetAcc =
    freshAccs.find((e) => e.sid === obj.currentId) ?? freshAccs[0];

  const res = await getProfile(targetAcc.token);
  if (!res) {
    // removing invalid target account
    const remTarToken = freshAccs.filter((e) => e.sid !== targetAcc.sid);

    if (remTarToken.length === 0) return null;

    const newObj = {
      currentId: remTarToken[0].sid,
      acc_s: remTarToken,
    };
    return validateTokens(newObj);
  }

  const newObj = {
    currentId: targetAcc.sid,
    acc_s: freshAccs,
  };

  localStorage.setItem(storageKey, JSON.stringify(newObj));

  return newObj;
}

export const useAuthGuard = () => {
  const router = useRouter();

  const [authStatus, setAuthStatus] = useState<
    "checking" | "unauthorised" | "authorised"
  >("checking");

  // here add toaster for more infos
  const toaster = useToast();

  useEffect(() => {
    async function accAuth() {
      try {
        const accounts = localStorage.getItem(storageKey);

        if (!accounts) {
          setAuthStatus("unauthorised");
          toaster.errorToast("unauthorised");

          router.replace("/login");
        } else {
          const obj = await validateObj(accounts as string);
          if (!obj) {
            setAuthStatus("unauthorised");
            toaster.errorToast("unauthorised");

            router.replace("/login");
            localStorage.removeItem(storageKey);
          }

          setAuthStatus("authorised");
        }
      } catch {
        setAuthStatus("unauthorised");
        toaster.errorToast("unauthorised");
      }
    }

    accAuth();
  }, [router]);
  return { authStatus };
};
