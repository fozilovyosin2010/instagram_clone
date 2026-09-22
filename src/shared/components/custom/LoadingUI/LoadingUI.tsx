"use client";
import Image from "next/image";

import Logo from "@/public/instagram.svg";

export const LoadingUI = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-[#fff] flex justify-center items-end pb-4 dark:bg-[#000]">
      <div className="flex flex-col items-center justify-between h-[60%]">
        <Image
          src={Logo}
          alt="instagram-logo"
          className="w-[150px] h-[150px] max-md:w-[120px] max-md:h-[120px]"
        />
        <div className="container1 text-gray-400  dark:text-[#fff]">
          <div className="block1 flex justify-center items-center gap-2">
            <p className="text-[18px] text-[500] font-[600] max-sm:text-[16px]">
              from
            </p>
            <span className="bg-gradient-to-br from-purple-600 to-red-600 bg-clip-text text-transparent font-[800] text-[22px]">
              Yosin
            </span>
          </div>
          <div className="block2 max-sm:text-[16px]">
            © 2024 Instagram from Yosin
          </div>
        </div>
      </div>
    </div>
  );
};
