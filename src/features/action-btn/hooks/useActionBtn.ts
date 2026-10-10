import { useAuthGuard } from "@/src/features/guard/hooks/useAuthGuard";
// here
export const useActionBtn = (name: string) => {
  // here add log out logic

  function LogOut(id: string) {
    const { authStatus, res } = useAuthGuard();
    console.log(res);
  }
  return { LogOut };
};
