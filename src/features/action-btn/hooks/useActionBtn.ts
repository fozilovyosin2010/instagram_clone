// continue from here
import { useAuthGuard } from "@/src/features/guard/";

import { storageKey } from "@/src/shared/model";

import { useToast } from "@/src/shared/hooks";

export const useActionBtn = () => {
  // getting availible accounts
  const { accounts, resetFunc } = useAuthGuard();

  const { infoToast } = useToast();

  function LogOut() {
    if (accounts) {
      const newArr = accounts.acc_s.filter((e) => e.sid !== accounts.currentId);

      const targetAcc = accounts.acc_s.find(
        (e) => e.sid === accounts.currentId,
      );

      if (newArr.length === 0) localStorage.removeItem(storageKey);
      else {
        const obj = {
          currentId: newArr[0].sid,
          acc_s: newArr,
        };

        localStorage.setItem(storageKey, JSON.stringify(obj));
      }

      infoToast(`Account "${targetAcc?.name}" is logged out`);

      resetFunc();
    }
  }

  function switchAccount(sid: string) {
    if (accounts) {
      const newAccObj = {
        ...accounts,
        currentId: sid,
      };

      localStorage.setItem(storageKey, JSON.stringify(newAccObj));
    }
  }
  return { LogOut, switchAccount, accounts, resetFunc };
};
