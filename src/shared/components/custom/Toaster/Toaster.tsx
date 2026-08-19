import clsx from "clsx";
import { X } from "lucide-react";

interface ICustomToaster {
  icon: any;
  title: string;
  des: string;
  type: "error" | "success" | "loading";
  onClose(): void;
}

export const CustomToaster = ({
  icon,
  title,
  des,
  type,
  onClose,
}: ICustomToaster) => {
  console.log("mini re-render");

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl bg-linear-to-tr text-[#fff] font-[600] flex justify-between items-center gap-4 p-[10px_15px] w-full max-w-[400px] shadow-2xl max-sm:gap-1 max-sm:p-1",
        type == "success"
          ? "from-green-400 to-green-600 border-[2px] border-green-600 dark:from-green-600 dark:to-green-800 "
          : "from-red-400 to-red-600 border-[2px] border-red-600 dark:from-red-600 dark:to-red-800 ",
      )}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-0 w-full h-1 rounded-lg loader bg-[#fff]",
        )}
      ></div>
      {icon}
      <div className="space-y-[3px]">
        <h1 className="text-[16px]">{title}</h1>
        <p className="max-w-[300px] truncate text-[12px]">{des}</p>
      </div>
      <button onClick={onClose}>
        <X
          size={25}
          className={clsx(
            "border rounded-full font-[700] p-1 bg-[#fff] hover:bg-[#efeeee] duration-300",
            type == "success" ? "text-[#019c07]" : "text-[#9c0401]",
          )}
        />
      </button>
    </div>
  );
};
