import Image from "next/image";

import Logo from "@/public/instagram.svg";
import phone from "@/public/phone.png";
import playMarIcon from "@/public/playMarIcon.png";
import microSoftIcon from "@/public/microsoftIcon.png";

import { ReactNode } from "react";

import { headers } from "next/headers";
import Link from "next/link";

const layout = async ({ children }: { children: ReactNode }) => {
  const headerList = await headers();
  const path = headerList.get("x-url");
  console.log(path);

  return (
    <div className="cont flex justify-between gap-[30px] py-5 px-6 max-md:justify-center max-md:pt-[70px] max-sm:px-2">
      <div className="block1 flex flex-col items-center gap-[30px] max-md:hidden">
        <Image alt="instagram-pictures" className="w-[350px]" src={phone} />

        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-500 font-[600]  text-center">
            Get The App
          </span>
          <div className="flex justify-between gap-3">
            <Image className="w-[150px]" src={playMarIcon} alt="playmarket" />
            <Image className="w-[150px]" src={microSoftIcon} alt="microSof" />
          </div>
        </div>
      </div>
      <div className="block2 w-[400px] min-w-[300px] max-w-[500px] max-md:w-full mx-5 flex flex-col justify-between gap-[50px]">
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
          {children}
        </div>
        <div className="space-x-2 border p-[20px_40px] rounded-lg text-[16px] max-md:p-[10px_20px] text-center">
          {path === "/login" ? (
            <>
              <span>Already have an account?</span>
              <Link href="/login" className="text-purple-600 font-[600]">
                Log in
              </Link>
            </>
          ) : (
            <>
              <span>Don't have an account yet?</span>
              <Link href="/register" className="text-purple-600 font-[600]">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default layout;
