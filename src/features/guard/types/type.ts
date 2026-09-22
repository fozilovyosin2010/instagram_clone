import { z } from "zod";

export type Iacc_s = z.infer<typeof Iacc_s_Schema>;

export type IaccountObj_Schema = z.infer<typeof validObjSchema>;

const Iacc_s_Schema = z.object({
  sid: z.string(),
  name: z.string(),

  exp: z.number(),
  token: z.string(),
});

export const validObjSchema = z.object({
  acc_s: z.array(Iacc_s_Schema),
  currentId: z.string(),
});
