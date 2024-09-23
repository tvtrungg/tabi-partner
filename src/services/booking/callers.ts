import { request } from "@umijs/max";
import { interpolate } from "@/utils/common";
import { APPROVE_ID_PATCH, REJECT_ID_PATCH } from "./paths";
import { listBookings } from "../data";

export const getBookings = async (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  // return request(BOOKINGS_PATH, {
  //   method: "GET",
  //   params: {
  //     l,
  //     p,
  //     f,
  //     s: "created_at",
  //     o: "DESC",
  //   },
  // });

  let response: TBookingsList[] = [];
  const limit = l;
  const page_n = p;
  const start = limit * (page_n - 1);
  const end = limit * page_n;
  response = listBookings.slice(start, end) as TBookingsList[];

  const filter = f;
  response = listBookings.filter((booking: { [key: string]: any }) => {
    for (const key in filter) {
      if (booking[key] !== filter[key]) return false;
    }
    return true;
  }) as TBookingsList[];

  return {
    data: response,
    total: listBookings.length,
  };
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
