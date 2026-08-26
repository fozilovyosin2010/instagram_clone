import { AuthForm, IinpFields } from "@/src/features/auth/index";

const inpList: IinpFields[] = [
  {
    name: "username",
    label: "Phone number, user name or email",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const page = () => {
  return <AuthForm formType="login" btnSubmit="Log in" inpFields={inpList} />;
};

export default page;
