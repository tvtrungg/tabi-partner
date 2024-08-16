import { request } from "@umijs/max";
import { VIET_QR_BANKS, RP_INFORMATION } from "./paths";

export const getBanks = async () => {
  return request(VIET_QR_BANKS, {
    method: "GET",
  });
};

export const getRPInformation = async () => {
  return request(RP_INFORMATION, {
    method: "GET",
  });
};
