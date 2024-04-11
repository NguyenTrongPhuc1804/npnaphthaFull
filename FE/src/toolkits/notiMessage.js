import { Toaster, toast } from "sonner";
export const notifySonner = (name, message) => {
  toast(name, {
    description: message,
  });
};
