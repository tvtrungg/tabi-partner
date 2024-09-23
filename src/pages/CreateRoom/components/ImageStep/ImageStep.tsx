import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "@umijs/max";
import { Button, Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/lib";
import { useState } from "react";
import "./ImageStep.less";

type TImageStepProps = {
  files: UploadFile<any>[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
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

function ImageStep({ files, setFiles }: TImageStepProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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

  return (
    <>
      <Upload
        className="upload-custom"
        listType="picture-card"
        fileList={files}
        onPreview={handlePreview}
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
      <Modal
        centered
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
    </>
  );
}

export default ImageStep;
