import clsx from "clsx";
import { X } from "lucide-react";

interface ICustomToaster {
  icon: React.ComponentType<any>;
  title: string;
  des: string;
  type: string;
  onClose(): void;
}

export const CustomToaster = ({
  icon: Icon,
  title,
  des,
  type,
  onClose,
}: ICustomToaster) => {
  console.log("mini re-render");

  return (
    <div
      className={clsx(
        "rounded-xl bg-linear-to-tr text-[#fff] font-[600] flex justify-between items-center gap-3 p-[10px_15px] w-full max-w-[400px] shadow-2xl",
        type == "success" &&
          "dark:from-green-600 dark:to-green-800 from-green-400 to-green-600",
      )}
    >
      <Icon />
      <div className="space-y-[3px]">
        <h1>{title}</h1>
        <p className="max-w-[300px] truncate text-[14px]">{des}</p>
      </div>
      <button onClick={onClose}>
        <X
          size={22}
          className="border rounded-md p-1 bg-[#fff] text-[#49df4e]"
        />
      </button>
    </div>
  );
};
