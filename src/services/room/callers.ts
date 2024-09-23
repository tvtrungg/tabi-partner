import { request } from "@umijs/max";
import { ROOMS_PATH, ROOM_BY_ID } from "./paths";
import { interpolate } from "@/utils/common";
import { listBookings } from "../data";
import listRooms from "./data/listRooms.json";
import roomDetails from "./data/roomDetails.json";

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
  // return request(ROOMS_PATH,{
  //   method: "GET",
  //   params: {
  //     l,
  //     p,
  //     f,
  //     s: "id",
  //   },
  // });

  let response: TRoomList[] = [];
  const limit = l;
  const page_n = p;
  const start = limit * (page_n - 1);
  const end = limit * page_n;
  response = listRooms.slice(start, end) as TRoomList[];

  const filter = f;
  response = listRooms.filter((room: { [key: string]: any }) => {
    for (const key in filter) {
      if (room[key] !== filter[key]) return false;
    }
    return true;
  }) as TRoomList[];

  return {
    data: response,
    total: listRooms.length,
  };
};

export const getRoomById = async (id: number) => {
  // return request(interpolate(ROOM_BY_ID, { id }), {
  //   method: "GET",
  // });

  const room = roomDetails.find((room) => room.id === Number(id));
  return room;
};

export const getBookingListById = async (id: number) => {
  // return request(interpolate(BOOKING_LIST, { id }), {
  //   method: "GET",
  // });

  const resp = listBookings.filter(
    (booking) => booking.room_id === Number(id) && booking.status === "APP"
  );

  return { data: resp, total: resp.length };
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
