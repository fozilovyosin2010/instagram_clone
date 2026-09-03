import Image from "next/image";

import Logo from "@/public/instagram.svg";

const loading = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-[#fff] flex justify-center items-end pb-4">
      <div className="flex flex-col items-center justify-between h-[60%]">
        <Image
          src={Logo}
          alt="instagram-logo"
          className="w-[150px] h-[150px] max-md:w-[120px] max-md:h-[120px]"
        />
        <div className="container1">
          <div className="block1 flex flex-col items-center">
            <p className="text-[18px] text-[500] text-gray-400 font-[600]">
              from
            </p>
            <span className="bg-gradient-to-br from-purple-800 to-red-600 bg-clip-text text-transparent font-[800] text-[20px]">
              Yosin
            </span>
          </div>
          <div className="block2 text-gray-400">
            © 2024 Instagram from Yosin
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
