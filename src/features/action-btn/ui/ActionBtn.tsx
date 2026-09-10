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

export function ActionBtn({ children }: { children: IactionList[] }) {
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
          {children.map((e, i) => {
            if (e.isDestructive)
              return (
                <div key={`${e.text}-${i}`}>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    {e.icon}
                    {e.text}
                  </DropdownMenuItem>
                </div>
              );
            return (
              <DropdownMenuItem key={`${e.text}-${i}`}>
                {e.icon}
                {e.text}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuGroup></DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
