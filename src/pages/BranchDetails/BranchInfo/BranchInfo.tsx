import { EN_LOCALE } from "@/constants/locale";
import {
  useUpdateActiveBranch,
  useUpdateBranch,
} from "@/services/branch/services";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Access, FormattedMessage, useIntl } from "@umijs/max";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Upload,
  UploadFile,
  Divider,
  message,
} from "antd";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import LocationSelect from "@/components/core/LocationSelect";
import AccommodationType from "@/components/core/AccommodationType";
import Note from "@/components/common/Note";
import BMInfo from "../BMInfo";
import hotel from "@/assets/images/hotel_img.png";

type TBranchInfo = {
  id: number;
  data: TBranchDetails;
  locale: string;
  access: {
    isRP: boolean;
    isBM: boolean;
    isHST: boolean;
  };
  refetch: () => void;
};
const { TextArea } = Input;

function BranchInfo({ id, data, locale, access, refetch }: TBranchInfo) {
  const intl = useIntl();
  const [isBIModalOpen, setIsBIModalOpen] = useState(false);
  const [form] = Form.useForm<TUpdateBranch>();
  const { mutate: mutateUpdateBranch } = useUpdateBranch(Number(id));
  const [showEmail, setShowEmail] = useState(
    data.branch_manager.email ? true : false
  );

  // update active of branch
  const { mutate: mutateActive } = useUpdateActiveBranch(() => {
    refetch();
    message.success(
      intl.formatMessage({
        id: "pages.branch_details.enable_success",
      })
    );
  });

  const [files, setFiles] = useState<UploadFile<any>[]>([]);

  return (
    <>
      <div
        className="relative bg-img-custom w-full aspect-video rounded-2xl overflow-hidden min-w-[336px]"
        style={{
          backgroundImage: `url(${hotel})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute top-5 left-0 w-full flex justify-between text-white px-5">
          <div>
            <h1 className="text-2xl capitalize">{data.branch_name}</h1>
            <h2 className="font-normal text-base capitalize">
              {locale === EN_LOCALE ? data.type.label_en : data.type.label_vi}
            </h2>
          </div>
          <Access accessible={access.isRP || access.isHST}>
            <button
              type="button"
              onClick={() => setIsBIModalOpen(true)}
              className="h-8 w-8 bg-transparent hover:text-primary-dominant-light cursor-pointer border-none"
            >
              <FiEdit className="text-2xl" />
            </button>
          </Access>
        </div>
      </div>
      <div>
        <div className="mb-3">
          <Access accessible={access.isBM || access.isHST}>
            {!data.is_active && (
              <>
                <Note>
                  <FormattedMessage id="pages.branch_details.note.enable" />
                </Note>
                <Popconfirm
                  title={
                    <FormattedMessage id="pages.branch_details.is_active" />
                  }
                  description={
                    <FormattedMessage id="pages.branch_details.confirm_is_active" />
                  }
                  icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                  className=""
                  onConfirm={() => {
                    mutateActive();
                  }}
                >
                  <Button
                    type="primary"
                    className="w-full h-8 flex justify-center items-center gap-2 rounded-md font-medium"
                  >
                    <FaRegCircleCheck />
                    <FormattedMessage id="pages.branch_details.enable" />
                  </Button>
                </Popconfirm>
              </>
            )}
          </Access>
        </div>

        <Access accessible={access.isRP}>
          <Access accessible={access.isRP}>
            <Divider orientation="left" orientationMargin={0}>
              <FormattedMessage id="pages.branch_details.bm_info.titleBM" />
            </Divider>
          </Access>
          <Access accessible={access.isHST}>
            <Divider orientation="left" orientationMargin={0}>
              <FormattedMessage id="pages.branch_details.bm_info.title" />
            </Divider>
          </Access>

          <BMInfo data={data} refetch={refetch} />
        </Access>

        <Divider orientation="left" orientationMargin={0}>
          <FormattedMessage id="pages.branch_details.sub_title" />
        </Divider>
        <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
          <h3 className="font-light text-sm">
            <FormattedMessage id="pages.branch_details.address" />
          </h3>
          <h2 className="mb-1 font-normal text-sm">{data.address}</h2>
        </div>
        <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
          <h3 className="font-light text-sm">
            <FormattedMessage id="pages.branch_details.ward" />
          </h3>
          <h2 className="mb-1 font-normal text-sm">{data.ward}</h2>
        </div>
        <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
          <h3 className="font-light text-sm">
            <FormattedMessage id="pages.branch_details.district" />
          </h3>
          <h2 className="mb-1 font-normal text-sm">{data.district}</h2>
        </div>
        <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
          <h3 className="font-light text-sm">
            <FormattedMessage id="pages.branch_details.province_city" />
          </h3>
          <h2 className="mb-1 font-normal text-sm">{data.province_city}</h2>
        </div>
        <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
          <h3 className="font-light text-sm">
            <FormattedMessage id="pages.branch_details.description" />
          </h3>
          <h2 className="mb-1 font-normal text-sm">{data.description}</h2>
        </div>
        <Access accessible={access.isHST}>
          <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
            <h3 className="font-light text-sm">
              <FormattedMessage id="pages.branch_details.tax_number" />
            </h3>
            <h2 className="mb-1 font-normal text-sm">{data.tax_number}</h2>
          </div>
          <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
            <h3 className="font-light text-sm">
              <FormattedMessage id="pages.branch_details.website_url" />
            </h3>
            <h2 className="mb-1 font-normal text-sm">{data.website_url}</h2>
          </div>
        </Access>
      </div>

      <Access accessible={access.isRP || access.isHST}>
        <Modal
          title={
            <FormattedMessage id="pages.branch_details.branch_info.title" />
          }
          open={isBIModalOpen}
          okText="Save"
          centered
          onCancel={() => {
            setIsBIModalOpen(false);
          }}
          width={850}
          className="top-5"
          closeIcon={false}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                if (files.length !== 1) {
                  message.error(
                    intl.formatMessage({
                      id: "pages.branch_details.branch_info.upload_image.required",
                    })
                  );
                  return;
                }
                if (!showEmail) {
                  values.email = "";
                }

                values.full_address = `${values.address}, ${values.ward}, ${values.district}, ${values.province_city}`;
                mutateUpdateBranch(values);
              })
              .catch(() => {});
          }}
        >
          <Form
            form={form}
            initialValues={{
              branch_name: data.branch_name,
              type_id: data.type.id,
              address: data.address,
              email: data.branch_manager.email,
              province_city: data.province_city,
              district: data.district,
              ward: data.ward,
              description: data.description,
              tax_number: data.tax_number,
              website_url: data.website_url,
            }}
            name="branch_info_form"
            className="create-room-form mt-5 w-full"
          >
            <Form.Item
              name="branch_name"
              label={
                <FormattedMessage id="pages.branch_details.branch_info.branch_name.label" />
              }
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "pages.branch_details.branch_info.branch_name.required",
                  }),
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: "pages.branch_details.branch_info.branch_name.label",
                })}
              />
            </Form.Item>
            <AccommodationType />
            <Access accessible={access.isHST}>
              <Form.Item
                name="paypal_support"
                label={intl.formatMessage({
                  id: "signUp.steps.step1.form.paypalSupport.label",
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "pages.createBranch.form.receptionArea.required",
                    }),
                  },
                ]}
                initialValue={data.branch_manager.email ? true : false}
              >
                <Radio.Group
                  onChange={(e) => {
                    setShowEmail(e.target.value);
                  }}
                  className="py-2"
                >
                  <Radio value={true}>
                    <FormattedMessage id="yes" />
                  </Radio>
                  <Radio value={false}>
                    <FormattedMessage id="no" />
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {showEmail && (
                <Form.Item
                  label={
                    <FormattedMessage id="signUp.steps.step1.form.email.label" />
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: "signUp.steps.step1.form.email.required",
                      }),
                    },
                    {
                      type: "email",
                    },
                  ]}
                  className="w-full h-auto flex items-start justify-between mt-2"
                >
                  <Input
                    placeholder={intl.formatMessage({
                      id: "signUp.steps.step1.form.email.placeholder",
                    })}
                    className="px-2 py-1"
                    allowClear
                  />
                </Form.Item>
              )}
            </Access>
            <Form.Item
              name="address"
              label={
                <FormattedMessage id="pages.branch_details.branch_info.address.label" />
              }
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "pages.branch_details.branch_info.address.required",
                  }),
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: "pages.branch_details.branch_info.address.label",
                })}
              />
            </Form.Item>
            <LocationSelect form={form} />
            <Form.Item
              name="description"
              label={
                <FormattedMessage id="pages.branch_details.branch_info.description.label" />
              }
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "pages.branch_details.branch_info.description.required",
                  }),
                },
              ]}
            >
              <TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder={intl.formatMessage({
                  id: "pages.branch_details.branch_info.description.label",
                })}
              />
            </Form.Item>
            <Access accessible={access.isHST}>
              <Form.Item
                label={
                  <FormattedMessage id="signUp.steps.step3.form.businessInformation.taxCode.label" />
                }
                name="tax_number"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "signUp.steps.step3.form.businessInformation.taxCode.required",
                    }),
                  },
                ]}
                className="w-full h-auto flex items-start justify-between"
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: "signUp.steps.step3.form.businessInformation.taxCode.placeholder",
                  })}
                  className="px-2 py-1"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label={
                  <FormattedMessage id="signUp.steps.step3.form.businessInformation.website.label" />
                }
                name="website_url"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "signUp.steps.step3.form.businessInformation.website.required",
                    }),
                  },
                ]}
                className="w-full h-auto flex items-start justify-between"
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: "signUp.steps.step3.form.businessInformation.website.placeholder",
                  })}
                  className="px-2 py-1"
                  allowClear
                />
              </Form.Item>
            </Access>
            <Form.Item
              label={
                <FormattedMessage id="pages.branch_details.branch_info.upload_image.title" />
              }
              required
            >
              <Upload
                className="upload-wrapper-custom"
                listType="picture-card"
                fileList={files}
                onChange={(info) => {
                  setFiles(info.fileList);
                }}
                onRemove={() => {
                  setFiles([]);
                }}
                accept="image/*"
              >
                {files.length === 1 ? null : (
                  <Button className="border-none bg-transparent cursor-pointer flex flex-col items-center justify-center">
                    <PlusOutlined />
                    <div className="mt-2">
                      <FormattedMessage id="pages.room_details.upload" />
                    </div>
                  </Button>
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </Access>
    </>
  );
}

export default BranchInfo;
