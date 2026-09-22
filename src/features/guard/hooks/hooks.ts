import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  IaccountObj_Schema,
  validObjSchema,
} from "@/src/features/guard/types/type";

const storageKey = "instagram_clone";

function validateObj(jsonObj: string) {
  if (!jsonObj) return null;
  try {
    let parsedObj = validObjSchema.safeParse(JSON.parse(jsonObj));

    if (!parsedObj.success) {
      console.log(parsedObj.error);

      localStorage.removeItem(storageKey);
      return null;
    }

    return validateTokens(parsedObj.data);
  } catch (error) {
    console.log(error);

    localStorage.removeItem(storageKey);
    return null;
  }
}

function validateTokens(obj: IaccountObj_Schema) {
  // not expired
  const freshAccs = obj.acc_s.filter((e) => e.exp > Date.now());
  const targetAcc = freshAccs.find((e) => e.sid === obj.currentId);

  let newObj: IaccountObj_Schema | null = obj;
  if (freshAccs.length === 0) newObj = null;
  else if (!targetAcc && freshAccs.length > 0) {
    newObj = {
      currentId: freshAccs?.[0].sid,
      acc_s: freshAccs,
    };
  }
  localStorage.setItem(storageKey, JSON.stringify(newObj));
  return newObj;
}

export const useAuthGuard = () => {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let accounts = localStorage.getItem(storageKey);

    if (!accounts) router.replace("/login");
    else {
      const obj = validateObj(accounts);
      console.log(obj);
      if (!obj) router.replace("/login");
    }
    setIsChecking(false);
  }, []);
  return { isChecking };
};
