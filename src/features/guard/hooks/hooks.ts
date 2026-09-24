import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  IaccountObj_Schema,
  validObjSchema,
} from "@/src/features/guard/types/type";
import axios from "axios";

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

    console.log(data);
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
  console.log("func is running!");

  // searching for fresh accounts
  const freshAccs = obj.acc_s.filter((e) => e.exp > Date.now());

  if (freshAccs.length === 0) {
    return null;
  }
  // is targeted account expired and does it exist
  const targetAcc =
    freshAccs.find((e) => e.sid === obj.currentId) ?? freshAccs[0];

  const res = await getProfile(targetAcc.token);
  console.log(res, freshAccs);
  if (!res) {
    console.log("fwehiuh");

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

// here add toaster for more infos
export const useAuthGuard = () => {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function accAuth() {
      try {
        const accounts = localStorage.getItem(storageKey);

        if (!accounts) router.replace("/login");
        else {
          const obj = await validateObj(accounts as string);
          console.log(obj);
          if (!obj) {
            router.replace("/login");
            localStorage.removeItem(storageKey);
          }
        }
      } finally {
        setIsChecking(false);
      }
    }

    // running the logic
    accAuth();
  }, [router]);
  return { isChecking };
};
