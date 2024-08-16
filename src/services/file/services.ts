import { useMutation, useQuery } from "react-query";
import { deleteFiles, getFiles, postPresignedFiles } from "./callers";

const keyFile = {
  fileBatch: "FILE_BATCH",
};

export const usePostBatchFilePresigned = (
  onSuccess?: TOnSuccessCallback<TBatchFileResponse>
) => {
  return useMutation<
    TBatchFileResponse,
    TErrorResponse,
    TBatchFilePreSignedRequest
  >({
    mutationKey: keyFile.fileBatch,
    mutationFn: (creation) => {
      return postPresignedFiles(creation);
    },
    onSuccess,
  });
};

export const useGetFiles = (params: TAttachmentInfo) => {
  return useQuery<TListResponse<TFileResponse>, TErrorResponse>({
    queryKey: [
      keyFile.fileBatch,
      params.attachment_id,
      params.attachment_type,
      params.field,
      params.sort_order,
    ],
    queryFn: () => {
      return getFiles(params);
    },
  });
};
// example for get files
// const { data } = useGetFiles({
//   attachment_id: 3,
//   attachment_type: fileQueryField.branch.attachmentType,
//   field: fileQueryField.branch.field.thumbnail,
// });

export const useDeleteFiles = () => {
  return useMutation<void, TErrorResponse, number[]>({
    mutationKey: keyFile.fileBatch,
    mutationFn: (fileIds) => {
      return deleteFiles(fileIds);
    },
  });
};
