import { request } from "@umijs/max";
import { FILES_PATH, UPLOAD_PRESIGNED_PATH } from "./paths";

export const postPresignedFiles = async (
  creation: TBatchFilePreSignedRequest
) => {
  return request(UPLOAD_PRESIGNED_PATH, {
    method: "POST",
    data: creation,
  });
};

export const getFiles = async (params: TAttachmentInfo) => {
  return request(FILES_PATH, {
    method: "GET",
    params: {
      f: params,
      s: "sort_order",
      o: "ASC",
    },
  });
};

export const deleteFiles = async (fileIds: number[]) => {
  return request(FILES_PATH, {
    method: "DELETE",
    data: {
      IDs: fileIds,
    },
  });
};
