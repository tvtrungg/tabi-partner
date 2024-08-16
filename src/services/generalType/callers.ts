import { request } from "@umijs/max";
import { ACCOMMODATION_PATH, BED_TYPE_PATH } from "./paths";

export const getAccommodationType = async (locale: string) => {
  return request(`${ACCOMMODATION_PATH}/${locale}`, {
    method: "GET",
  });
};

export const getBedType = async (locale: string) => {
  return request(`${BED_TYPE_PATH}/${locale}`, {
    method: "GET",
  });
};
