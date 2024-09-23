import { request } from "@umijs/max";
import { interpolate } from "@/utils/common";
import {
  // GET_ROOM_TYPE_PATH,
  // GET_ROOM_TYPE_FOR_BM_PATH,
  // GET_ROOM_TYPE_OF_BRANCH_BY_ID_PATH,
  POST_ROOM_TYPE_TO_BM_BY_ID_PATH,
  GET_ROOM_TYPE_TO_LINK_BRANCH,
  UPDATE_ROOM_TYPE_FACILITIES_PATH,
  LINK_UNLINK_ROOM_TYPE_PATH,
} from "./paths";
import {
  TRoomTypeAddRequest,
  TRoomTypeLinkUnlinkRequest,
  TRoomTypeOfBranch,
  TRoomTypeUpdateFacilitiesRequest,
} from "./typing";
import roomTypes from "./data.json";

export const getRoomType = async () => {
  // return request(GET_ROOM_TYPE_PATH, {
  //   method: "GET",
  // });

  return {
    data: roomTypes,
    total: roomTypes.length,
  };
};

export const getRoomTypeForBM = async () => {
  // return request(GET_ROOM_TYPE_FOR_BM_PATH, {
  //   method: "GET",
  // });

  return {
    data: roomTypes,
    total: roomTypes.length,
  };
};

export const getRoomTypeOfBranchByID = async (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  // return request(GET_ROOM_TYPE_OF_BRANCH_BY_ID_PATH, {
  //   method: "GET",
  //   params: {
  //     l,
  //     p,
  //     f,
  //   },
  // });
  let response: TRoomTypeOfBranch[] = [];
  const limit = l;
  const page_n = p;
  const start = limit * (page_n - 1);
  const end = limit * page_n;
  response = roomTypes.slice(start, end) as TRoomTypeOfBranch[];

  const filter = f;
  response = roomTypes.filter((room: { [key: string]: any }) => {
    for (const key in filter) {
      if (room[key] !== filter[key]) return false;
    }
    return true;
  }) as TRoomTypeOfBranch[];

  return {
    data: response,
    total: roomTypes.length,
  };
};

export const getRoomTypeToLinkBranch = async (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return request(GET_ROOM_TYPE_TO_LINK_BRANCH, {
    method: "GET",
    params: {
      l,
      p,
      f,
    },
  });
};

export const postRoomTypeToBranchByID = async (data: TRoomTypeAddRequest) => {
  const checkInTime = new Date(data.check_in_time);
  checkInTime.setHours(checkInTime.getHours() + 7);
  const checkInTimeUTC7 = checkInTime.toISOString();

  const checkOutTime = new Date(data.check_out_time);
  checkOutTime.setHours(checkOutTime.getHours() + 7);
  const checkOutTimeUTC7 = checkOutTime.toISOString();

  return request(POST_ROOM_TYPE_TO_BM_BY_ID_PATH, {
    method: "POST",
    data: {
      ...data,
      check_in_time: checkInTimeUTC7,
      check_out_time: checkOutTimeUTC7,
    },
  });
};

export const updateRoomTypeByID = async (
  updateRoomTypeRequest: TRoomTypeUpdateFacilitiesRequest
) => {
  const id = updateRoomTypeRequest.id;
  const checkInTime = new Date(updateRoomTypeRequest.check_in_time);
  checkInTime.setHours(checkInTime.getHours() + 7);
  const checkInTimeUTC7 = checkInTime.toISOString();

  const checkOutTime = new Date(updateRoomTypeRequest.check_out_time);
  checkOutTime.setHours(checkOutTime.getHours() + 7);
  const checkOutTimeUTC7 = checkOutTime.toISOString();

  return request(interpolate(UPDATE_ROOM_TYPE_FACILITIES_PATH, { id }), {
    method: "PATCH",
    data: {
      ...updateRoomTypeRequest,
      check_in_time: checkInTimeUTC7,
      check_out_time: checkOutTimeUTC7,
    },
  });
};

export const linkUnlinkRoomType = async (
  linkUnlinkRoomTypeRequest: TRoomTypeLinkUnlinkRequest
) => {
  return request(LINK_UNLINK_ROOM_TYPE_PATH, {
    method: "PATCH",
    data: {
      ...linkUnlinkRoomTypeRequest,
    },
  });
};
