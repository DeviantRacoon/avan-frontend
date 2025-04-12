import api from "@/common/libs/api-services";
import { USER_MODULES } from "@/common/utils/constants";

export const login = async (user: string, pass: string) => {
  return api.post("users?", {
    user,
    pass,
    m: USER_MODULES.LOGIN,
  });
};

export const forgotPassword = async (email: string) => {
  return api.post("auth/forgot-password", {
    email,
    m: USER_MODULES.FORGOT_PASSWORD,
  });
};
