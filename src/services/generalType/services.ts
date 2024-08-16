import { useQuery } from "react-query";
import { getAccommodationType, getBedType } from "./callers";

export const keyGeneralType = {
  accommodationType: "ACCOMMODATION_TYPE",
  bedType: "BED_TYPE",
};

export const useGetAccommodationType = (locale: string) => {
  return useQuery<{ data: TAccommodationTypeResponse[] }, TErrorResponse>({
    queryKey: [keyGeneralType.accommodationType, locale],
    queryFn: () => {
      return getAccommodationType(locale);
    },
  });
};

export const useGetBedType = (locale: string) => {
  return useQuery<{ data: TBedTypeResponse[] }, TErrorResponse>({
    queryKey: [keyGeneralType.bedType, locale],
    queryFn: () => {
      return getBedType(locale);
    },
  });
};
