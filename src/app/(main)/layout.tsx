import { AuthGuardRoot } from "@/src/features/guard";

import { SideBar } from "@/src/widgets/sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthGuardRoot>
      <div>
        <SideBar />
        <main className="min-h-full ml-[400px]">{children}</main>
      </div>
    </AuthGuardRoot>
  );
};

export default layout;
