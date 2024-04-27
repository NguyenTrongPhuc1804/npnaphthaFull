import { Bounce, toast } from "react-toastify";

export const notify = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
    case "message":
      toast(message, {
        theme: "dark",
      });

    default:
      break;
  }
};

export const validateMess = {
  REQUIRE: "Không được để trống mục này",
  INVALID_PHONE: "Phải lớn hơn 9 kí tự",
  INVALID_EMAIL: "Email không hợp lệ",
  LEN: "Phải lớn hơn 5 kí tự",
};
