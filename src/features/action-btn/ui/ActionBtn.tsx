"use client";
import { Menu } from "lucide-react";

import { Button } from "@/src/shared/components/";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/";

import { IactionList } from "../types/type";
import { useActionBtn } from "../hooks/useActionBtn";

import SwitchAccDrawer from "./SwitchDrawer";

export function ActionBtn({ list }: { list: IactionList[] }) {
  const { LogOut, switchAccount, accounts, resetFunc } = useActionBtn();

  function hanOnClick(text: string, id: number) {
    // for Log out
    if (id === 56) LogOut();
    // for switch acc to get fresh and valid accs
    if (id === 34) resetFunc();

    console.log(text, id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant={"default"} />}
        className="text-[14px] flex gap-3"
      >
        <Menu />

        <span>More</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {list.map((e, i) => {
            return (
              <div key={`${e.text}-${i}`}>
                {e.id === 34 ? (
                  <SwitchAccDrawer
                    icon={e.icon}
                    text={e.text}
                    accountObj={accounts}
                    onClick={() => hanOnClick(e.text, e.id)}
                    onSwitchAcc={switchAccount}
                  />
                ) : (
                  <div>
                    {e.isDestructive && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={() => hanOnClick(e.text, e.id)}
                      variant={e.isDestructive ? "destructive" : "default"}
                    >
                      {e.icon}
                      {e.text}
                    </DropdownMenuItem>
                  </div>
                )}
              </div>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuGroup></DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
