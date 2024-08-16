import { request } from "@umijs/max";
import { interpolate } from "@/utils/common";
import { APPROVE_ID_PATCH, BOOKINGS_PATH, REJECT_ID_PATCH } from "./paths";

export const getBookings = async (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return request(BOOKINGS_PATH, {
    method: "GET",
    params: {
      l,
      p,
      f,
      s: "created_at",
      o: "DESC",
    },
  });
};

export const approveBooking = async (id: number) => {
  return request(interpolate(APPROVE_ID_PATCH, { id }), {
    method: "POST",
  });
};

export const rejectBooking = async (reason: TRejectRequest) => {
  return request(interpolate(REJECT_ID_PATCH, { id: reason.id }), {
    method: "POST",
    data: reason,
  });
};
