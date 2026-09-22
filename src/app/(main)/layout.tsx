import { AuthGuardRoot } from "@/src/features/guard";
import { ToggleBtn } from "@/src/features/toggleTheme";
import { SideBar } from "@/src/widgets/sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthGuardRoot>
      <div>
        {/* here */}
        {/* <header className="border-b pb-3">
        <ToggleBtn />
      </header>  */}
        <SideBar />
        <main className="min-h-full ml-[400px]">{children}</main>
      </div>
    </AuthGuardRoot>
  );
};

export default layout;
