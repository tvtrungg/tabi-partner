import { validatePhoneNumber } from "@/utils/common";
import { FormattedMessage, useIntl } from "@umijs/max";
import { Button, Form, Input, Space, message } from "antd";
import { FormInstance } from "antd";
import { useState } from "react";
import { FaRandom } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";

interface ICreateBMProps {
  form: FormInstance<TSignUpHSTRequest>;
}

function CreateBM({ form }: ICreateBMProps) {
  const intl = useIntl();
  const [pwd, setPwd] = useState("");

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

  return (
    <>
      <h1>
        <FormattedMessage id="signUp.manage_single_branch.title" />
      </h1>
      <p>
        <FormattedMessage id="signUp.manage_single_branch.subTitle" />
      </p>
      <div className="create-room-form mt-8 w-[500px]">
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
          name="email"
          label={<FormattedMessage id="pages.createBM.email.label" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: "pages.createBM.email.required",
              }),
            },
            {
              pattern: new RegExp(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
              ),
              message: intl.formatMessage({
                id: "pages.createBM.email.invalidFormat",
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "pages.createBM.email.placeholder",
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
      </div>
    </>
  );
}

export default CreateBM;
