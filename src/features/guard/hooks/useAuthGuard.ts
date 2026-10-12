import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  IaccountObj_Schema,
  validObjSchema,
} from "@/src/features/guard/types/type";
import axios from "axios";
import { useToast } from "@/src/shared/hooks";
import { storageKey } from "@/src/shared/model";

// validate through schema
function validateObj(jsonObj: string) {
  try {
    if (!jsonObj) throw new Error("Invalid obj");
    const parsedObj = validObjSchema.safeParse(JSON.parse(jsonObj));

    if (!parsedObj.success) {
      throw new Error("Invalid obj");
    }

    return parsedObj.data;
  } catch (error) {
    console.error(error);

    localStorage.removeItem(storageKey);
    return null;
  }
}

async function getProfile(token: string) {
  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_API}/UserProfile/get-my-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return "valid";
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log("token is either invalid or expired");

        return "invalid";
      }
    }

    return "server_error";
  }
}

export const useAuthGuard = () => {
  const router = useRouter();

  const [authStatus, setAuthStatus] = useState<
    "checking" | "unauthorised" | "authorised"
  >("checking");

  const [accounts, setAccount] = useState<IaccountObj_Schema | null>(null);

  const toaster = useToast();

  const [trigger, setTrigger] = useState(false);

  function resetFunc() {
    setTrigger((e) => !e);
  }

  useEffect(() => {
    let isMount = true;

    async function validateAccounts(data: IaccountObj_Schema | null) {
      if (data === null) return null;
      try {
        // searching for fresh accounts
        const freshAccs = data.acc_s.filter((e) => e.exp > Date.now());

        if (freshAccs.length === 0) {
          toaster.infoToast("Your accounts have expired!");

          throw new Error("expired_accounts");
        }
        // is targeted account expired and does it exist
        const targetAcc =
          freshAccs.find((e) => e.sid === data.currentId) ?? freshAccs[0];

        const res = await getProfile(targetAcc.token);

        if (!isMount) return null;

        if (res === "invalid") {
          // removing invalid target account
          const remTarToken = freshAccs.filter((e) => e.sid !== targetAcc.sid);
          if (remTarToken.length === 0) {
            toaster.infoToast(
              "Your current account is expired or invalid! Please, login again!",
            );

            throw new Error("expired_accounts");
          }
          const newObj = {
            currentId: remTarToken[0].sid,
            acc_s: remTarToken,
          };
          return validateAccounts(newObj);
        } else if (res === "server_error") {
          toaster.errorToast("Server error! Please try again!");

          return null;
        }

        const newObj = {
          currentId: targetAcc.sid,
          acc_s: freshAccs,
        };

        localStorage.setItem(storageKey, JSON.stringify(newObj));

        return newObj;
      } catch (error) {
        console.error(error);

        if ((error as Error).message === "expired_accounts") {
          localStorage.removeItem(storageKey);
        }
        return null;
      }
    }

    async function accAuth() {
      try {
        const accounts = localStorage.getItem(storageKey);

        if (!accounts) {
          setAuthStatus("unauthorised");

          localStorage.removeItem(storageKey);
          router.replace("/login");

          return;
        }
        const validateWithSchema = validateObj(accounts);

        const validateWithApi = await validateAccounts(validateWithSchema);

        if (!isMount) return;

        if (!validateWithApi) {
          setAuthStatus("unauthorised");

          router.replace("/login");
          return;
        }

        setAccount(validateWithApi);
        setAuthStatus("authorised");
      } catch {
        setAuthStatus("unauthorised");
        toaster.errorToast("An error occurred during authorization");

        router.replace("/login");
      }
    }

    accAuth();

    return () => {
      isMount = false;
    };
  }, [trigger]);

  return { authStatus, accounts, resetFunc };
};
