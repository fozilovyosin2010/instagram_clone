import { Toaster } from "@/src/shared/components/index";
import { SideBar } from "@/src/widgets/sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {" "}
      {/* here */}
      {/* <header className="border-b pb-3">
            <ToggleBtn />
          </header> */}
      <SideBar />
      <Toaster />
      <main className="min-h-full ml-[400px]">{children}</main>
    </div>
  );
};

export default layout;
