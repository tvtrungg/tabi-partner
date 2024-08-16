import { fileQueryField } from "@/constants/fileQueryField";
import {
  useDeleteFiles,
  useGetFiles,
  usePostBatchFilePresigned,
} from "@/services/file/services";
import { convertToBatchFileRequest, uploadS3 } from "@/services/file/utils";
import { Access, FormattedMessage, useIntl } from "@umijs/max";
import { Button, message, Modal, Upload, UploadFile } from "antd";
import { useCallback, useEffect, useState } from "react";
import { RcFile } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { UPDATED } from "@/constants/status";
import { useUpdateRoomStatus } from "@/services/room/services";
import { FiEdit } from "react-icons/fi";
import { BsCheck } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import "./ImageDEtails.less";

type ImageDetailsProps = {
  data: TRoomDetails;
  access: {
    isRP: boolean;
    isBM: boolean;
    isHST: boolean;
  };
  refetch: () => void;
};

interface ICustomUploadFile extends UploadFile {
  file_id: number;
  sort_order: number;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ImageDetails({ data, refetch, access }: ImageDetailsProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState<ICustomUploadFile[]>([]);
  const intl = useIntl();

  const { mutate: mutateUpdateRoomStatus } = useUpdateRoomStatus(
    data.id,
    UPDATED,
    () => {
      refetch();
    }
  );

  // get image of room
  const {
    data: dataGetImage,
    isLoading,
    refetch: refetchGetImage,
  } = useGetFiles({
    attachment_id: data?.id,
    attachment_type: fileQueryField.room.attachmentType,
    field: fileQueryField.room.field.gallery,
  });

  // post file
  const [files, setFiles] = useState<ICustomUploadFile[]>([]);
  const fileMutation = usePostBatchFilePresigned();

  // handle upload
  const handleUpload = () => {
    const creation = convertToBatchFileRequest(files, {
      attachment_id: data.id,
      attachment_type: fileQueryField.room.attachmentType,
      field: fileQueryField.room.field.gallery,
    });

    fileMutation.mutate(creation, {
      onSuccess: (resp) => {
        uploadS3(resp, files).then(() => {
          mutateUpdateRoomStatus();
        });
      },
    });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  // handle update file
  const { mutate: deleteFileMutation } = useDeleteFiles();

  const postNewFiles = useCallback(async () => {
    const existFiles: ICustomUploadFile[] = [];
    const newFiles: UploadFile[] = [];
    files.forEach((file) => {
      if (file.file_id !== undefined && file.sort_order !== undefined) {
        existFiles.push(file);
      } else {
        newFiles.push(file);
      }
    });

    if (newFiles.length === 0) {
      setIsEdit(false);
      return;
    }

    const fromSortOrder =
      existFiles.length > 0
        ? existFiles[existFiles.length - 1].sort_order + 1
        : 0;
    const creation = convertToBatchFileRequest(
      newFiles,
      {
        attachment_id: data.id,
        attachment_type: fileQueryField.room.attachmentType,
        field: fileQueryField.room.field.gallery,
      },
      fromSortOrder
    );

    fileMutation.mutate(creation, {
      onSuccess: (resp) => {
        uploadS3(resp, newFiles).then(() => {
          refetchGetImage();
          setIsEdit(false);
        });
      },
    });
  }, [files]);

  const handleUpdate = async () => {
    if (files.length === 0) {
      message.error(
        intl.formatMessage({
          id: "pages.room_details.gallery.on_error",
        })
      );
      return;
    }

    if (deletedFiles.length > 0) {
      const fileIds = deletedFiles.map((item) => item.file_id);
      deleteFileMutation(fileIds, {
        onSuccess: () => {
          postNewFiles();
        },
      });
    } else {
      postNewFiles();
    }
  };

  const onCancel = () => {
    setIsEdit(false);
    const oldList = [
      ...(files.filter(
        (item) => item.file_id !== undefined && item.sort_order !== undefined
      ) as ICustomUploadFile[]),
      ...deletedFiles,
    ];
    oldList.sort((a, b) => a.sort_order - b.sort_order);
    setFiles(oldList);
    setDeletedFiles([]);
  };

  const hasImages = data.status === UPDATED && dataGetImage !== null;
  useEffect(() => {
    if (hasImages) {
      setFiles(
        dataGetImage?.data?.map((item) => {
          return {
            name: item.file_name,
            status: isLoading ? "uploading" : "done",
            url: item.get_url,
            file_id: item.id,
            sort_order: item.sort_order,
          };
        }) as ICustomUploadFile[]
      );
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [dataGetImage]);

  return (
    <div className="image-details-wrapper relative">
      <Access accessible={access.isBM || access.isHST}>
        {hasImages && (
          <div className="absolute right-1 top-1 cursor-pointer">
            {isEdit ? (
              <div className="flex">
                <MdCancel
                  className="text-xl text-primary-dominant border border-primary-dominant border-solid p-[2px] rounded w-6 h-6 mr-2"
                  onClick={onCancel}
                />
                <BsCheck
                  className="text-xl bg-primary-dominant text-light p-[2px] rounded w-6 h-6"
                  onClick={handleUpdate}
                />
              </div>
            ) : (
              <FiEdit
                className="text-xl bg-transparent"
                onClick={() => {
                  setIsEdit(true);
                }}
              />
            )}
          </div>
        )}
      </Access>

      <h1 className="text-lg font-bold mb-3">
        <FormattedMessage id="pages.room_details.gallery.title" />
      </h1>
      <div>
        <Upload
          className={`upload-wrapper ${!isEdit ? "hide-upload-select" : ""}`}
          listType="picture-card"
          fileList={files}
          onPreview={handlePreview}
          onRemove={(file) => {
            if (hasImages) {
              setDeletedFiles([...deletedFiles, file as ICustomUploadFile]);
            }
          }}
          onChange={(info) => {
            setFiles(info.fileList as ICustomUploadFile[]);
          }}
          multiple
          accept="image/*"
        >
          <Button className="border-none bg-transparent cursor-pointer flex flex-col items-center justify-center">
            <PlusOutlined />
            <div className="mt-2">
              <FormattedMessage id="pages.room_details.upload" />
            </div>
          </Button>
        </Upload>

        {!hasImages && (
          <Button
            type="primary"
            className="float-right px-3"
            onClick={handleUpload}
          >
            <FormattedMessage id="pages.createRoom.form.submitButton" />
          </Button>
        )}
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img
            alt="Preview"
            className="w-full mt-4 rounded-md"
            src={previewImage}
          />
        </Modal>
      </div>
    </div>
  );
}
export default ImageDetails;
