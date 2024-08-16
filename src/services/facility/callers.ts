import { request } from "@umijs/max";
import { FACILITY_PATH } from "./paths";

export const getMainFacility = async (locale: string) => {
  return request(`${FACILITY_PATH}/${locale}`, {
    method: "GET",
    params: {
      f: { type: "MAIN" },
    },
  });
};

export const getRoomFacility = async (locale: string) => {
  return request(`${FACILITY_PATH}/${locale}`, {
    method: "GET",
    params: {
      f: { type: "ROOM" },
    },
  });
};
