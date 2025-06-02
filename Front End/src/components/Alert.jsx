
import { toast } from "@/components/ui/use-toast";

export const showSuccessToast = (message) => {
  toast({
    title: "Berhasil",
    description: message,
    variant: "default",
    className: "bg-green-50 border-green-200",
  });
};

export const showErrorToast = (message) => {
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};

export const showInfoToast = (message) => {
  toast({
    title: "Informasi",
    description: message,
    className: "bg-blue-50 border-blue-200",
  });
};
