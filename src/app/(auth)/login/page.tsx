import { AuthForm, IinpFields } from "@/src/features/auth/index";

import Image from "next/image";

import Logo from "@/public/instagram.svg";
import Link from "next/link";

const inpList: IinpFields[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const page = () => {
  return (
    <>
      <div className="border rounded-lg p-[10px_20px] flex flex-col gap-[20px] justify-between">
        <div className="flex items-center">
          <Image
            alt="instagram-logo"
            src={Logo}
            className="w-[80px] h-[80px]"
          />
          <span className="text-[30px] font-mono max-md:text-[25px]">
            Instagram
          </span>
        </div>
        <AuthForm formType="login" btnSubmit="Log in" inpFields={inpList} />
      </div>
      <div className="space-x-2 border p-[20px_40px] rounded-lg text-[16px] max-md:p-[10px_20px] text-center">
        <span>Don't have an account yet?</span>
        <Link href="/register" className="text-purple-600 font-[600]">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default page;
