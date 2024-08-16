import { request } from "@umijs/max";
import { ME_PATH } from "./paths";

export const getMe = async (): Promise<TMeResponse> => {
  return request(ME_PATH, {
    method: "GET",
  });
};
