import { useQuery } from "react-query";
import { getBanks, getRPInformation } from "./callers";

export const keyOther = {
  vietQRBanks: "VIET_QR_BANKS",
  rpInformation: "RP_INFORMATION",
};

export const useGetBanks = () => {
  return useQuery<{ data: TVietQRBank[] }, TErrorResponse>({
    queryKey: [keyOther.vietQRBanks],
    queryFn: () => {
      return getBanks();
    },
  });
};

export const useGetRPInformation = () => {
  return useQuery<{ data: TRPInformation }, TErrorResponse>({
    queryKey: [keyOther.rpInformation],
    queryFn: () => {
      return getRPInformation();
    },
  });
};
