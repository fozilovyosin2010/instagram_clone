import Image from "next/image";

import Logo from "@/public/instagram.svg";
import { LoginForm } from "@/src/features/auth/login/index";

const page = () => {
  return (
    <div className="border rounded-lg p-[10px_20px] flex flex-col gap-[20px] justify-between">
      <div className="flex items-center">
        <Image alt="instagram-logo" src={Logo} className="w-[80px] h-[80px]" />
        <span className="text-[30px] font-mono">Instagram</span>
      </div>

      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
