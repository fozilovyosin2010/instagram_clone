import { AuthForm, IinpFields } from "@/src/features/auth";

const inpList: IinpFields[] = [
  { name: "username", type: "text", label: "Username" },
  { name: "fullname", type: "text", label: "Fullname" },
  { name: "email", type: "email", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  { name: "confirmPassword", type: "text", label: "ConfirmPassword" },
];

const page = () => {
  return (
    <>
      <AuthForm formType="register" btnSubmit="Register" inpFields={inpList} />
    </>
  );
};

export default page;
