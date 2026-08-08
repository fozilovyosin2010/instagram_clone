import Image from "next/image";

import phone from "@/public/phone.png";

import playMarIcon from "@/public/playMarIcon.png";
import microSoftIcon from "@/public/microsoftIcon.png";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center px-6">
      <div className="block1 flex flex-col items-center gap-[30px]">
        <Image alt="instagram-pictures" className="w-[400px]" src={phone} />

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

      <div className="w-[400px]">{children}</div>
    </div>
  );
};

export default layout;
