import { request } from "@umijs/max";
import { ROOMS_PATH, ROOM_BY_ID, BOOKING_LIST } from "./paths";
import { interpolate } from "@/utils/common";

export const postRoom = async (room: TRoomRequest) => {
  return request(ROOMS_PATH, {
    method: "POST",
    data: room,
  });
};

export const getRooms = async (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return request(ROOMS_PATH, {
    method: "GET",
    params: {
      l,
      p,
      f,
      s: "id",
    },
  });
};

export const getRoomById = async (id: number) => {
  return request(interpolate(ROOM_BY_ID, { id }), {
    method: "GET",
  });
};

export const getBookingListById = async (id: number) => {
  return request(interpolate(BOOKING_LIST, { id }), {
    method: "GET",
  });
};

export const updateRoomInfo = async (id: number, room_data: TRoomDetails) => {
  return request(interpolate(ROOM_BY_ID, { id }), {
    method: "PATCH",
    data: room_data,
  });
};

export const updateRoomTypeOfRoom = async (
  id: number,
  room_type_data: TRoomTypeBM
) => {
  return request(interpolate(ROOM_BY_ID, { id }), {
    method: "PATCH",
    data: room_type_data,
  });
};

export const updateRoomPriceDetails = async (
  id: number,
  price_data: TUpdatePriceDetails
) => {
  return request(interpolate(ROOM_BY_ID, { id }), {
    method: "PATCH",
    data: price_data,
  });
};

export const updateRoomStatus = async (id: number, status: string) => {
  return request(interpolate(ROOM_BY_ID, { id }), {
    method: "PATCH",
    data: { status },
  });
};
