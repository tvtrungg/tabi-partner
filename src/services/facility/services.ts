import { useQuery } from "react-query";
import { getMainFacility, getRoomFacility } from "./callers";

export const keyFacility = {
  mainFacility: "MAIN_FACILITY",
  roomFacility: "ROOM_FACILITY",
};

export const useGetMainFacilities = (locale: string) => {
  return useQuery<{ data: TFacilityResponse[] }, TErrorResponse>({
    queryKey: [keyFacility.mainFacility, locale],
    queryFn: () => {
      return getMainFacility(locale);
    },
  });
};

export const useGetRoomFacilities = (locale: string) => {
  return useQuery<{ data: TFacilityResponse[] }, TErrorResponse>({
    queryKey: [keyFacility.roomFacility, locale],
    queryFn: () => {
      return getRoomFacility(locale);
    },
  });
};
