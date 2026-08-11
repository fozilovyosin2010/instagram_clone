import z from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Please fill username."),
  password: z.string().nonempty("Please fill password."),
});

export type ILoginFormValues = z.infer<typeof loginSchema>;
