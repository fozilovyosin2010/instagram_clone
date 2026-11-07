"use client";

import { Button } from "@/src/shared/components";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/components";
import { ReactElement, ReactNode } from "react";

const SNAP_POINTS = [0.5, 1];

export function DrawerSnapPoints({
  children,
  triggerBtn,
  title,
  direction,
  description,
}: {
  children?: ReactNode;
  direction: "down" | "up" | "left" | "right";
  triggerBtn: ReactElement;
  title: string;
  description: string;
}) {
  return (
    <Drawer swipeDirection={direction} snapPoints={SNAP_POINTS} showSwipeHandle>
      <DrawerTrigger render={triggerBtn} />
      <DrawerContent className="group">
        <DrawerHeader className="border-b pb-1">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
