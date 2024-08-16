import { useMutation, useQuery } from "react-query";
import { approveBooking, getBookings, rejectBooking } from "./callers";

const keyBookings = {
  booking: "BOOKING",
  room_details: "ROOM_DETAILS",
  approve: "APPROVE",
  reject: "REJECT",
};

export const useGetBookings = (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return useQuery<TListResponse<TBookingsList>, TErrorResponse>({
    queryKey: [keyBookings.booking, l, p, f],
    queryFn: () => getBookings(l, p, f),
  });
};

export const useApproveBooking = (onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse, number>({
    mutationKey: keyBookings.approve,
    mutationFn: (booking_id) => approveBooking(booking_id),
    onSuccess,
  });
};

export const useRejectBooking = (onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse, TRejectRequest>({
    mutationKey: keyBookings.reject,
    mutationFn: (reason) => rejectBooking(reason),
    onSuccess,
  });
};
