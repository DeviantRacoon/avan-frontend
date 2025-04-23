import { TProfileItem } from "../types/profile-item";

export interface IUserLogin {
  id_user: string;
  ds_user: string;
  completeName: string;
  photo_src: string;
  token: string;
  old_token: string;
  profile: TProfileItem[];
  id_profile: string;
  expiration: number;
}

