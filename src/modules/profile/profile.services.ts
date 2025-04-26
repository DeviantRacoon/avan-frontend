import api from "@/common/libs/api-services";
import { PROFILE_MODULE } from "@/common/utils/constants-modules";

export const getProfiles = async () => {
  return await api.safe.get("users", {
    m: PROFILE_MODULE.USER_LIST
  });
};

