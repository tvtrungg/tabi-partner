import { useQuery, useMutation } from "react-query";
import {
  getRoomType,
  getRoomTypeForBM,
  getRoomTypeOfBranchByID,
  getRoomTypeToLinkBranch,
  postRoomTypeToBranchByID,
  updateRoomTypeByID,
  linkUnlinkRoomType,
} from "./callers";
import {
  TRoomTypeOfBranch,
  TRoomTypeAddRequest,
  TRoomTypeUpdateFacilitiesRequest,
  TRoomTypeLinkUnlinkRequest,
} from "./typing";

export const keyRoomType = {
  roomType: "ROOM_TYPE",
  roomTypeBM: "ROOM_TYPE_BM",
  roomTypeBMByID: "ROOM_TYPE_BM_BY_ID",
  roomTypeToLinkBranch: "ROOM_TYPE_TO_LINK_BRANCH",
  postRoomTypeBMByID: "POST_ROOM_TYPE_BM_BY_ID",
  updateRoomType: "UPDATE_ROOM_TYPE",
  linkUnlinkRoomType: "LINK_UNLINK_ROOM_TYPE",
};

export const useGetRoomType = () => {
  return useQuery<TListResponse<TRoomTypeBM>, TErrorResponse>({
    queryKey: [keyRoomType.roomType],
    queryFn: () => {
      return getRoomType();
    },
  });
};

export const useGetRoomTypeForBM = () => {
  return useQuery<{ data: TRoomTypeBM[] }>({
    queryKey: [keyRoomType.roomTypeBM],
    queryFn: () => {
      return getRoomTypeForBM();
    },
  });
};

export const useGetRoomTypeOfBranchByID = (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return useQuery<TListResponse<TRoomTypeOfBranch>, TErrorResponse>({
    queryKey: [keyRoomType.roomTypeBMByID, l, p, f],
    queryFn: () => {
      return getRoomTypeOfBranchByID(l, p, f);
    },
  });
};

export const useGetRoomTypeToLinkBranch = (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return useQuery<{ data: TRoomTypeBM[] }>({
    queryKey: [keyRoomType.roomTypeToLinkBranch, l, p, f],
    queryFn: () => {
      return getRoomTypeToLinkBranch(l, p, f);
    },
  });
};

export const useAddRoomTypeToBranchByID = () => {
  return useMutation<TAuthResponse, TErrorResponse, TRoomTypeAddRequest>({
    mutationKey: [keyRoomType.postRoomTypeBMByID],
    mutationFn: (data) => {
      return postRoomTypeToBranchByID(data);
    },
  });
};

export const useUpdateRoomTypeByID = () => {
  return useMutation<
    TAuthResponse,
    TErrorResponse,
    TRoomTypeUpdateFacilitiesRequest
  >({
    mutationKey: [keyRoomType.updateRoomType],
    mutationFn: (updateRoomTypeRequest: TRoomTypeUpdateFacilitiesRequest) =>
      updateRoomTypeByID(updateRoomTypeRequest),
  });
};

export const useLinkUnlinkRoomTypeFromBranch = () => {
  return useMutation<TAuthResponse, TErrorResponse, TRoomTypeLinkUnlinkRequest>(
    {
      mutationKey: [keyRoomType.linkUnlinkRoomType],
      mutationFn: (linkUnlinkRoomTypeRequest: TRoomTypeLinkUnlinkRequest) =>
        linkUnlinkRoomType(linkUnlinkRoomTypeRequest),
    }
  );
};
