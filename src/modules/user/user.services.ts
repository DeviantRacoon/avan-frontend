import api from "@/common/libs/api-services";
import { USER_MODULES } from "@/common/utils/constants";

export const getUsers = async () => {
  return await api.safe.get("users", {
    m: USER_MODULES.USER_LIST
  });
};

export const createUser = async (data: any) => {
  return api.safe.post("users", {
    ...data,
    m: USER_MODULES.USER_UP,
  });
};

export const updateUser = async (data: any) => {
  return api.safe.put("users", {
    ...data,
    m: USER_MODULES.USER_EDIT,
  });
};
