import { useMutation, useQuery } from "react-query";
import {
  getRoomById,
  postRoom,
  updateRoomInfo,
  updateRoomPriceDetails,
  updateRoomTypeOfRoom,
  updateRoomStatus,
  getBookingListById,
} from "./callers";
import { getRooms } from "./callers";

const keyRoom = {
  room: "ROOM",
  room_details: "ROOM_DETAILS",
  edit_roomPrices: "EDIT_ROOM_PRICES",
  images_room: "IMAGES_ROOM",
  booking_list: "BOOKING_LIST",
};

export const usePostRoom = (onSuccess?: TOnSuccessCallback<TRoomResponse>) => {
  return useMutation<TRoomResponse, TErrorResponse, TRoomRequest>({
    mutationKey: keyRoom.room,
    mutationFn: (req) => {
      return postRoom(req);
    },
    onSuccess,
  });
};

export const useGetRooms = (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return useQuery<TListResponse<TRoomList>, TErrorResponse>({
    queryKey: [keyRoom.room, l, p, f],
    queryFn: () => getRooms(l, p, f),
  });
};

export const useGetRoomById = (id: number) => {
  return useQuery<TRoomDetails, TErrorResponse>({
    queryKey: [keyRoom.room_details, id],
    queryFn: () => {
      return getRoomById(id);
    },
  });
};

export const useGetBookingListById = (id: number) => {
  return useQuery<TListResponse<TBookingsList>, TErrorResponse>({
    queryKey: [keyRoom.booking_list, id],
    queryFn: () => {
      return getBookingListById(id);
    },
  });
};

export const useUpdateRoomInfo = (id: number, onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse, TRoomDetails>({
    mutationKey: keyRoom.room,
    mutationFn: (update) => updateRoomInfo(id, update),
    onSuccess,
  });
};

export const useUpdateRoomTypeOfRoom = (id: number, onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse, TRoomTypeBM>({
    mutationKey: keyRoom.room,
    mutationFn: (update) => updateRoomTypeOfRoom(id, update),
    onSuccess,
  });
};

export const useUpdateRoomPriceDetails = (
  id: number,
  onSuccess?: TCallback
) => {
  return useMutation<null, TErrorResponse, TUpdatePriceDetails>({
    mutationKey: keyRoom.edit_roomPrices,
    mutationFn: (update) => updateRoomPriceDetails(id, update),
    onSuccess,
  });
};

export const useUpdateRoomStatus = (
  id: number,
  status: string,
  onSuccess?: TCallback
) => {
  return useMutation<null, TErrorResponse>({
    mutationKey: keyRoom.room,
    mutationFn: () => updateRoomStatus(id, status),
    onSuccess,
  });
};
