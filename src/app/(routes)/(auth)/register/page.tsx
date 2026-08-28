import { AuthForm, IinpFields } from "@/src/features/auth";

import Logo from "@/public/instagram.svg";

import Image from "next/image";

import Link from "next/link";

const inpList: IinpFields[] = [
  { name: "username", type: "text", label: "Username" },
  { name: "fullname", type: "text", label: "Fullname" },
  { name: "email", type: "email", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  { name: "confirmPassword", type: "text", label: "ConfirmPassword" },
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
        <AuthForm
          formType="register"
          btnSubmit="Register"
          inpFields={inpList}
        />
      </div>
      <div className="space-x-2 border p-[20px_40px] rounded-lg text-[16px] max-md:p-[10px_20px] text-center">
        <span>Already have an account?</span>
        <Link href="/login" className="text-purple-600 font-[600]">
          Log in
        </Link>
      </div>
    </>
  );
};

export default page;
