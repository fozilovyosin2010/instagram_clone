import { useAuthGuard } from "@/src/features/guard/hooks/useAuthGuard";
import { storageKey } from "@/src/shared/model";
import { useToast } from "@/src/shared/hooks";
// here
export const useActionBtn = () => {
  // here add log out logic
  const { accounts, resetFunc } = useAuthGuard();

  const { infoToast } = useToast();

  function LogOut() {
    if (accounts) {
      const newArr = accounts.acc_s.filter((e) => e.sid !== accounts.currentId);

      let newAccData = "";

      if (newArr.length === 0) localStorage.removeItem(storageKey);
      else {
        const obj = {
          currentId: newArr[0].sid,
          acc_s: newArr,
        };

        newAccData = JSON.stringify(obj);
      }

      infoToast("Your account is logged out");

      localStorage.setItem(storageKey, newAccData);
      resetFunc();
    }
  }
  return { LogOut };
};
