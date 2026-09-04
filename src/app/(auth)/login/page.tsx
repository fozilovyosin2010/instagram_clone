import { AuthForm, IinpFields } from "@/src/features/auth/index";

const inpList: IinpFields[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const page = () => {
  return (
    <>
      <AuthForm formType="login" btnSubmit="Log in" inpFields={inpList} />
    </>
  );
};

export default page;
