import z from "zod";

export const loginSchema = z.object({
  username: z
    .string("Please fill username")
    .nonempty("Please fill username")
    .min(3, { message: "Minimum 3 symbols" })
    .max(20, { message: "Maximum 20 symbols" }),

  password: z
    .string("Please fill password")
    .nonempty("Please fill password")
    .min(4, { message: "Minimum 4 symbols" })
    .max(20, { message: "Maximum 20 symbols" }),
});

export const registerSchema = z
  .object({
    username: z
      .string("Please fill username")
      .nonempty("Please fill username")
      .min(3, { message: "Minimum 3 symbols" })
      .max(20, { message: "Maximum 20 symbols" }),
    fullname: z
      .string("Please fill fullname")
      .nonempty("Please fill fullname")
      .min(3, { message: "Minimum 3 symbols" })
      .max(20, { message: "Maximum 20 symbols" }),
    email: z
      .email("Please fill email")
      .nonempty("Please fill email")
      .min(3, { message: "Minimum 3 symbols" })
      .max(20, { message: "Maximum 20 symbols" }),
    password: z
      .string("Please fill password")
      .nonempty("Please fill password")
      .min(4, { message: "Minimum 4 symbols" })
      .max(20, { message: "Maximum 20 symbols" }),

    confirmPassword: z
      .string("Please fill password")
      .nonempty("Please fill password"),
  })
  // custom logic
  .refine((e) => e.confirmPassword == e.password, {
    // check if true then don't show an error
    message: "ConfirmPassword doesn't match password",
    // where this logic belongs
    path: ["confirmPassword"],
  });

export type ILoginFormValues = z.infer<typeof loginSchema>;
export type IRegisterFormValues = z.infer<typeof registerSchema>;

export interface IresAuth {
  status: number;
  data: { data: string | null; errors: string[] | null; statusCode: number };
}

export interface IinpFields {
  name: string;
  type: "text" | "password" | "email";
  label: string;
}

export interface IauthForm {
  formType: "login" | "register";
  inpFields: IinpFields[];
  btnSubmit: string;
}

export interface ItextFieldForm {
  errorMessage: string | undefined;
  label: string;
  type: "text" | "password" | "email";
  field: any;
}
