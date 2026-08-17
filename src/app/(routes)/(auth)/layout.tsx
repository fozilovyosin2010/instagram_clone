import Image from "next/image";

import phone from "@/public/phone.png";

import playMarIcon from "@/public/playMarIcon.png";
import microSoftIcon from "@/public/microsoftIcon.png";
import { ReactNode } from "react";
import Link from "next/link";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="cont flex justify-between pt-3 px-6 max-md:justify-center max-md:pt-[70px] max-md:px-12">
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

      <div className="block2 flex flex-col justify-between gap-4">
        <div className="max-w-[500px]">{children}</div>
        <div className="space-x-2 border p-[20px_40px] rounded-lg text-[16px]">
          <span>Don't have an account yet?</span>
          <Link href="/register" className="text-purple-600 font-[600]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default layout;
