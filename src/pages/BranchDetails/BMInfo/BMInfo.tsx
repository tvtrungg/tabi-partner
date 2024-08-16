import { useSignUpBM } from "@/services/branch/services";
import { Access, FormattedMessage, useAccess, useIntl } from "@umijs/max";
import { Button, Empty, Form, Input, Modal, Space, message } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaRandom, FaRegCopy } from "react-icons/fa";
import { validatePhoneNumber } from "@/utils/common";

type TBMInfoProps = {
  data: TBranchDetails;
  refetch: () => void;
};

function BMInfo({ data, refetch }: TBMInfoProps) {
  const intl = useIntl();
  const access = useAccess();
  const [bmModal, setBmModal] = useState(false);
  const [pwd, setPwd] = useState("");
  const [form] = Form.useForm<TSignUpBMRequest>();

  function generatePassword() {
    const length = 10;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    form.setFieldsValue({ password: retVal });
    setPwd(retVal);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success("Password copied to clipboard!");
      },
      () => {
        message.error("Failed to copy password!");
      }
    );
  };

  const { mutate } = useSignUpBM();

  return (
    <div className="flex flex-col ">
      {Object.values(data.branch_manager).some((value) => value) ? (
        <>
          <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
            <h3 className="font-light text-sm">
              <FormattedMessage id="pages.branch_details.bm_info.name" />
            </h3>
            <h2 className="mb-1 font-normal text-sm">
              {data.branch_manager.name}
            </h2>
          </div>
          <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
            <h3 className="font-light text-sm">
              <FormattedMessage id="pages.branch_details.bm_info.username" />
            </h3>
            <h2 className="mb-1 font-normal text-sm">
              {data.branch_manager.username}
            </h2>
          </div>
          <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
            <h3 className="font-light text-sm">
              <FormattedMessage id="pages.branch_details.bm_info.phone" />
            </h3>
            <h2 className="mb-1 font-normal text-sm">
              {data.branch_manager.phone}
            </h2>
          </div>
          {data.branch_manager.email && (
            <Access accessible={access.isHST}>
              <div className="border border-solid border-slate-300 rounded-lg p-2 mb-3">
                <h3 className="font-light text-sm">
                  <FormattedMessage id="pages.branch_details.bm_info.email" />
                </h3>
                <h2 className="mb-1 font-normal text-sm">
                  {data.branch_manager.email}
                </h2>
              </div>
            </Access>
          )}
        </>
      ) : (
        <>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <FormattedMessage id="pages.branch_details.no_manager" />
            }
          />
          <Button
            type="primary"
            className="flex justify-center items-center p-4 text-base font-semibold mx-5"
            onClick={() => setBmModal(true)}
          >
            <FaPlus className="mr-1" />
            <span>
              <FormattedMessage id="pages.branch_details.create_branch_manager" />
            </span>
          </Button>
        </>
      )}
      <Modal
        forceRender
        title={<FormattedMessage id="pages.createBM.title" />}
        open={bmModal}
        okText="Save"
        onCancel={() => {
          setBmModal(false);
          form.resetFields();
        }}
        closeIcon={true}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.phone = "0" + values.phone;
              const newValues = {
                ...values,
                branch_id: data.id,
              };
              mutate(newValues, {
                onSuccess: () => {
                  refetch();
                  message.success(
                    intl.formatMessage({
                      id: "pages.createBM.create_success",
                    })
                  );
                  form.resetFields();
                  setBmModal(false);
                },
              });
            })
            .catch(() => {});
        }}
      >
        <Form
          form={form}
          name="create_bm_form"
          className="create-room-form mt-5"
        >
          <Form.Item
            name="username"
            label={<FormattedMessage id="pages.createBM.username.label" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createBM.username.required",
                }),
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: intl.formatMessage({
                  id: "pages.createBM.username.invalidFormat",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "pages.createBM.username.placeholder",
              })}
              className="px-2 py-1"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<FormattedMessage id="pages.createBM.password.label" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createBM.password.required",
                }),
              },
            ]}
          >
            <Space.Compact className="w-full flex items-center justify-center">
              <Input
                readOnly
                value={pwd}
                placeholder={intl.formatMessage({
                  id: "pages.createBM.password.placeholder",
                })}
                className="px-2 py-1"
              />
              <Button
                onClick={() => copyToClipboard(form.getFieldValue("password"))}
              >
                <FaRegCopy />
              </Button>
              <Button icon={<FaRandom />} onClick={generatePassword} />
            </Space.Compact>
          </Form.Item>
          <Form.Item
            name="name"
            label={<FormattedMessage id="pages.createBM.name.label" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createBM.name.required",
                }),
              },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: intl.formatMessage({
                  id: "pages.createBM.name.invalidFormat",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "pages.createBM.name.placeholder",
              })}
              className="px-2 py-1"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label={<FormattedMessage id="pages.createBM.phone.label" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createBM.phone.required",
                }),
              },
              () => ({
                validator(_, value) {
                  const validationResult = validatePhoneNumber(intl, value);
                  if (validationResult) {
                    return Promise.reject(new Error(validationResult));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              type="number"
              className="w-full px-2 py-1"
              placeholder={intl.formatMessage({
                id: "pages.createBM.phone.placeholder",
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BMInfo;
