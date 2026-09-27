import { CustomToaster } from "@/src/shared/components/custom/Toaster/Toaster";

import { toast } from "sonner";
import { CircleCheck, Info, TriangleAlert } from "lucide-react";

export const useToast = () => {
  function errorToast(message: string) {
    toast.custom(
      (t) => (
        <CustomToaster
          type="error"
          icon={<TriangleAlert />}
          des={message as string}
          onClose={() => toast.dismiss(t)}
        />
      ),
      // prevents from dublication
      // {
      //   id: `errorToast-${id}`,
      // },
    );
  }
  function successToast(message: string) {
    toast.custom((t) => (
      <CustomToaster
        type="success"
        icon={<CircleCheck color="#fff" />}
        des={message as string}
        onClose={() => toast.dismiss(t)}
      />
    ));
  }
  function infoToast(message: string) {
    toast.custom((t) => (
      <CustomToaster
        type="info"
        icon={<Info />}
        des={message as string}
        onClose={() => toast.dismiss(t)}
      />
    ));
  }

  return { errorToast, successToast, infoToast };
};
