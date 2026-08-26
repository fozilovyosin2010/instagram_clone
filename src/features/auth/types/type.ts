import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Please fill username.")
    .max(20, { message: "Maximum 20 symbols" }),

  password: z
    .string()
    .nonempty("Please fill password.")
    .max(20, { message: "Maximum 20 symbols" }),
});

export type ILoginFormValues = z.infer<typeof loginSchema>;

export interface IresLogin {
  status: number;
  data: { data: string | null; errors: string[] | null; statusCode: number };
}

export interface IinpFields {
  name: string;
  type: "text" | "password" | "email";
  label: string;
}
[];

export interface IauthForm {
  formType: "login" | "register";
  inpFields: IinpFields[];
  btnSubmit: string;
}
