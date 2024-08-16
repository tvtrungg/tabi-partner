import { InfoCircleOutlined } from "@ant-design/icons";

const Note = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-100 p-2 w-full rounded-md my-4 text-neutral-600 text-[13px] flex items-center justify-start">
      <InfoCircleOutlined className="mr-2" />
      <div>{children}</div>
    </div>
  );
};

export default Note;
