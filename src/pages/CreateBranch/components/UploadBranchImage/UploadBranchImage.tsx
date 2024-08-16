import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { FormattedMessage } from "@umijs/max";
import { FormInstance, Image, Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import "./UploadBranchImage.less";

interface IUploadBranchImageProps {
  form: FormInstance<any>;
  files: UploadFile<any>[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
}

const { Dragger } = Upload;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function UploadBranchImage({ form, files, setFiles }: IUploadBranchImageProps) {
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  useEffect(() => {
    if (files.length === 1) {
      handlePreview(files[0]);
    }
  }, [files]);

  return (
    <div className="flex justify-center">
      <div className="w-2/3">
        {files.length === 0 ? (
          <Dragger
            name="file"
            fileList={files}
            onChange={(info) => {
              form.setFieldsValue({ file: info.fileList[0] });
              setFiles(info.fileList);
            }}
          >
            <div className="py-7">
              <InboxOutlined className="text-3xl text-neutral-600" />

              <p className="m-0 mt-2 text-neutral-600">
                <FormattedMessage id="pages.createBranch.dragger.hint_1" />
              </p>
              <p className="m-0 mt-1  text-neutral-600">
                <FormattedMessage id="pages.createBranch.dragger.hint_2" />
              </p>
            </div>
          </Dragger>
        ) : (
          <div className="w-full flex justify-center dash-border p-2 relative wrap-image">
            <Image
              className="max-h-[400px]"
              src={previewImage}
              preview={false}
            />
            <div className="absolute inset-2 rounded-sm bg-black bg-opacity-20 flex justify-center items-center transition-effect delete-frame">
              <div
                className="flex justify-center items-center hover:cursor-pointer transition-effect hover:bg-dark hover:bg-opacity-45 rounded-full px-2 py-1"
                onClick={() => {
                  form.setFieldsValue({ file: [] });
                  setFiles([]);
                }}
              >
                <DeleteOutlined className="text-light text-base" />
                <p className="m-0 ml-2 text-light">
                  <FormattedMessage id="delete" />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBranchImage;
