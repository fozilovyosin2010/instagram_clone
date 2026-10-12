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

export function ActionBtn({ list }: { list: IactionList[] }) {
  const { LogOut } = useActionBtn();

  function hanOnClick(text: string) {
    // here

    if (text === "Log out") LogOut();

    console.log(text);
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
              <div onClick={() => hanOnClick(e.text)} key={`${e.text}-${i}`}>
                {e.isDestructive && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  variant={e.isDestructive ? "destructive" : "default"}
                >
                  {e.icon}
                  {e.text}
                </DropdownMenuItem>
              </div>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuGroup></DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
