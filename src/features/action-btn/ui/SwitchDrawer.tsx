"use client";

import {
  Button,
  DrawerSnapPoints,
  RadioGroupItem,
} from "@/src/shared/components";
import { Label } from "@/src/shared/components/ui/label";
import { RadioGroup } from "@base-ui/react";

import { useEffect, useState } from "react";

import { IswitchDrawer } from "../types/type";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

const addBtnList = [
  {
    text: "Add an existing account",
    link: "/login",
    style: "bg-[#3b91ed] hover:bg-[#1c80ec] border-[#0382a5]",
  },
  {
    text: "Add a new account",
    link: "/register",
    style: "bg-[#413bed] hover:bg-[#201cec] border-[#771bb0]",
  },
];

const SwitchAccDrawer = ({
  text,
  icon,
  accountObj,
  onSwitchAcc,
  onClick,
}: IswitchDrawer) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (accountObj !== null) {
      setValue(`item-${accountObj.currentId}`);
    }
  }, [accountObj]);

  return (
    <DrawerSnapPoints
      direction="down"
      title="Switch account"
      description="Select an account to switch"
      triggerBtn={
        <Button
          onClick={onClick}
          variant={"ghost"}
          className="w-full flex justify-start"
        >
          {icon}
          {text}
        </Button>
      }
      children={
        <div className="p-2">
          <RadioGroup value={value} onValueChange={setValue}>
            <div className="flex flex-col justify-between group-data-[swipe-axis=y]/drawer-popup:w-full group-data-expanded:min-h-[300px]  group-data-expanded:h-full h-[240px] px-3">
              <div className="flex flex-col gap-1 w-full max-h-[300px] overflow-y-auto p-3">
                {accountObj?.acc_s?.map((e) => {
                  return (
                    <button
                      onClick={() => onSwitchAcc(e.sid)}
                      disabled={e.sid === accountObj.currentId}
                      key={e.sid}
                    >
                      <Label
                        className="flex justify-between items-center gap-3 border rounded-[20px] p-[5px_10px] hover:bg-[#f6f6f6]"
                        htmlFor={e.sid}
                      >
                        <div className="flex gap-3 items-center inter w-full">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API}/images/${e.profileImg}`}
                            className="block1 border w-[50px] h-[50px] rounded-[50px]"
                          />
                          <div className="block2 flex flex-col gap-1 py-2">
                            <span className="text-[14px] font-[600]">
                              {e.name}
                            </span>
                          </div>
                        </div>
                        <RadioGroupItem value={`item-${e.sid}`} id={e.sid} />
                      </Label>
                    </button>
                  );
                })}
              </div>
              {/* here check out for ability to add it to intercepted-route  */}
              <div className="w-full flex justify-between sm:gap-2 px-2 bg-[#fff] border-t font-[600] text-[14px] max-sm:flex-col sticky top-10">
                {addBtnList.map((e, i) => {
                  return (
                    <Link
                      key={e.text + i}
                      href={e.link}
                      className={`w-full mt-3 p-[5px_10px] text-[#fff] ${e.style} border-[2px] rounded-[15px] flex justify-center duration-300`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="truncate">{e.text}</span>
                        <UserRoundPlus className="" size={14} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </RadioGroup>
        </div>
      }
    />
  );
};

export default SwitchAccDrawer;
