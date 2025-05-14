
import { toast } from "@/components/ui/use-toast";

export const showSuccessToast = (message) => {
  toast({
    title: "Berhasil",
    description: message,
    variant: "default",
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
  });
};
