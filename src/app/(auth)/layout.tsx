import Image from "next/image";

import phone from "@/public/phone.png";

import playMarIcon from "@/public/playMarIcon.png";
import microSoftIcon from "@/public/microsoftIcon.png";

import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
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
        {children}
      </div>
    </div>
  );
};

export default layout;
