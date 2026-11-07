import { IaccountObj_Schema } from "@/src/features/guard/";

export interface IactionList {
  id: number;
  text: string;
  isDestructive: boolean;
  icon: any;
}

export interface IswitchDrawer {
  text: string;
  icon: any;
  accountObj: IaccountObj_Schema | null;
  onSwitchAcc(sid: string): void;
  onClick(): void;
}
