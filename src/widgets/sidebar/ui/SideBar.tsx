import {
  ArrowLeftRight,
  Bell,
  CircleUserRound,
  Compass,
  House,
  LogOut,
  MessageCircle,
  Settings,
  SquarePlay,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const pageList = [
  { icon: <House />, name: "Home", url: "/" },
  { icon: <Compass />, name: "Interestings", url: "/interestings" },
  { icon: <SquarePlay />, name: "Reels", url: "/reels" },
  { icon: <MessageCircle />, name: "Messages", url: "/messages" },
  { icon: <Bell />, name: "Notifications", url: "/notifications" },
  { icon: <CircleUserRound />, name: "Profile", url: "/profile" },
];

import Logo from "@/public/instagram.svg";

import { ActionBtn } from "@/src/features/action-btn";
import { IactionList } from "@/src/features/action-btn/types/type";

// here
const actionList: IactionList[] = [
  {
    text: "Setting",
    icon: <Settings />,
    onClick: "",
    isDestructive: false,
  },
  {
    text: "Switch account",
    icon: <ArrowLeftRight />,
    onClick: "",
    isDestructive: false,
  },
  {
    text: "Log out",
    icon: <LogOut />,
    onClick: "",
    isDestructive: true,
  },
];

export const SideBar = () => {
  // here this component must be SSR
  return (
    <aside className="fixed left-0 top-0 bottom-0 border-r h-full w-[270px] flex flex-col justify-between">
      <div>
        <div className="flex items-center ml-4">
          <Image
            src={Logo}
            className="w-[50px] h-[50px]"
            alt="instagram-logo"
          />
          <h1 className="text-[20px] font-mono pacifico font-[400]">
            Instagram
          </h1>
        </div>
        <hr />
        <nav className="flex flex-col ml-4">
          {pageList.map((e, i) => {
            return (
              <Link
                href={e?.url as string}
                key={`${e.name}-i`}
                className="flex gap-3 items-center p-[10px_20px] hover:bg-blue-300 rounded-l-2xl hover:border-r-[4px] hover:border-r-blue-700 duration-400 hover:text-blue-900 inter font-[500]"
              >
                {e.icon}
                <span>{e.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex gap-3 items-center p-[10px_20px] duration-400 border-t pt-3">
        {/* <Menu /> */}

        <ActionBtn children={actionList} />
      </div>
    </aside>
  );
};
