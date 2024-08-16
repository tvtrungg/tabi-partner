import { TRoomTypeUpdateFacilitiesRequest } from "@/services/roomType/typing";
import { proxy, useSnapshot } from "@umijs/max";
import dayjs from "dayjs";

const roomFacilitiesAddState = proxy<{
  room_facilities: number[];
}>({
  room_facilities: [],
});

const roomFacilitiesEditState = proxy<{
  isOpenEditDialog: boolean;
  editForm: TRoomTypeUpdateFacilitiesRequest;
}>({
  isOpenEditDialog: false,
  editForm: {
    id: -1,
    branch_id: -1,
    type_name: "",
    check_in_time: "",
    check_out_time: "",
    include_breakfast: false,
    room_facilities: [],
  },
});

const roomTypeLinkUnlinkState = proxy<{
  isOpenLinkRoomTypeModal: boolean;
}>({
  isOpenLinkRoomTypeModal: false,
});

export const useGetRoomFacilitiesAddState = () => {
  return useSnapshot(roomFacilitiesAddState);
};

export const setRoomFacilitiesAddState = (roomFacilitiesIDs: number[]) => {
  roomFacilitiesAddState.room_facilities = roomFacilitiesIDs;
};

export const useGetRoomFacilitiesEditState = () => {
  return useSnapshot(roomFacilitiesEditState);
};

export const setRoomFacilitiesEditDialogState = (isOpen: boolean) => {
  roomFacilitiesEditState.isOpenEditDialog = isOpen;
};

export const setRoomFacilitiesEditDialogForm = (
  editForm: TRoomTypeUpdateFacilitiesRequest
) => {
  const check_in_time = dayjs(editForm.check_in_time);
  const check_out_time = dayjs(editForm.check_out_time);
  roomFacilitiesEditState.editForm = {
    ...editForm,
    check_in_time: check_in_time,
    check_out_time: check_out_time,
  };
};

export const useGetRoomTypeLinkUnlinkState = () => {
  return useSnapshot(roomTypeLinkUnlinkState);
};

export const setIsOpenLinkRoomTypeModal = (isOpen: boolean) => {
  roomTypeLinkUnlinkState.isOpenLinkRoomTypeModal = isOpen;
};
