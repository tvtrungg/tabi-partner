import { useQuery } from "react-query";
import { getMe } from "./callers";

export const keyMe = {
  me: "ME",
};

export const useGetMe = () => {
  return useQuery<TMeResponse, TErrorResponse>({
    queryKey: [keyMe.me],
    queryFn: () => {
      return getMe();
    },
  });
};
