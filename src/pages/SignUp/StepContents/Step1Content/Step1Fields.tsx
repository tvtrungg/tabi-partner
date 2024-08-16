import { validatePhoneNumber } from "@/utils/common";
import { FormattedMessage, useIntl } from "@umijs/max";
import { Form, Input, Radio, Typography } from "antd";
import { useState } from "react";

type Step1FieldsProps = {
  paypal_support: boolean;
};

function Step1Fields({ paypal_support }: Step1FieldsProps) {
  const intl = useIntl();

  const [showEmail, setShowEmail] = useState(paypal_support);

  return (
    <>
      <div className="form-custom-step-1 w-[550px] min-h-[300px] pe-2">
        <Form.Item
          label={
            <FormattedMessage id="signUp.steps.step1.form.username.label" />
          }
          name="username"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: "signUp.steps.step1.form.username.required",
              }),
            },
            {
              min: 4,
              message: intl.formatMessage({
                id: "signUp.steps.step1.form.username.rule",
              }),
            },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: intl.formatMessage({
                id: "pages.createBM.username.invalidFormat",
              }),
            },
          ]}
          className="w-full h-auto flex items-start justify-between mt-4"
        >
          <Input
            placeholder={intl.formatMessage({
              id: "signUp.steps.step1.form.username.placeholder",
            })}
            className="w-[300px] px-2 py-1"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="signUp.steps.step1.form.fullname.label" />
          }
          name="full_name"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id={intl.formatMessage({
                    id: "signUp.steps.step1.form.fullname.required",
                  })}
                />
              ),
            },
          ]}
          className="w-full h-auto flex items-start justify-between mt-2"
        >
          <Input
            placeholder={intl.formatMessage({
              id: "signUp.steps.step1.form.fullname.placeholder",
            })}
            className="w-[300px] px-2 py-1"
            allowClear
          />
        </Form.Item>
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
          initialValue={false}
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
              className="w-[300px] px-2 py-1"
              allowClear
            />
          </Form.Item>
        )}

        <Form.Item
          label={
            <FormattedMessage id="signUp.steps.step1.form.phoneNumber.label" />
          }
          name="phone"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: "signUp.steps.step1.form.phoneNumber.required",
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
          className="w-full h-auto flex items-start justify-between mt-2"
        >
          <Input
            type="number"
            className="w-[300px] px-2 py-1"
            placeholder={intl.formatMessage({
              id: "signUp.steps.step1.form.phoneNumber.placeholder",
            })}
          />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="signUp.steps.step1.form.password.label" />
          }
          name="password"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: "signUp.steps.step1.form.password.required",
              }),
            },
            {
              min: 4,
              message: intl.formatMessage({
                id: "signUp.steps.step1.form.password.rule",
              }),
            },
          ]}
          className="w-full h-auto flex items-start justify-between mt-2"
        >
          <Input.Password
            placeholder={intl.formatMessage({
              id: "signUp.steps.step1.form.password.placeholder",
            })}
            className="w-[300px] px-2 py-1"
          />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="signUp.steps.step1.form.reenterPassword.label" />
          }
          name="reenterPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: "signUp.steps.step1.form.reenterPassword.required",
              }),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    intl.formatMessage({
                      id: "signUp.steps.step1.form.reenterPassword.rule",
                    })
                  )
                );
              },
            }),
          ]}
          className="w-full h-auto flex items-start justify-between mt-2"
        >
          <Input.Password
            placeholder={intl.formatMessage({
              id: "signUp.steps.step1.form.reenterPassword.placeholder",
            })}
            className="w-[300px] px-2 py-1"
          />
        </Form.Item>
      </div>
      <div className="w-[550px] text-center mt-5">
        <Typography.Text>
          <FormattedMessage id="signUp.steps.step1.form.termsAndCondtitions.text1" />
          <Typography.Text className="text-primary-dominant" strong={true}>
            <FormattedMessage id="signUp.steps.step1.form.termsAndCondtitions.termsOfService" />
          </Typography.Text>
          <FormattedMessage id="signUp.steps.step1.form.termsAndCondtitions.text2" />
          <Typography.Text className="text-primary-dominant" strong={true}>
            <FormattedMessage id="signUp.steps.step1.form.termsAndCondtitions.privacyNotice" />
          </Typography.Text>
          <FormattedMessage id="signUp.steps.step1.form.termsAndCondtitions.text3" />
        </Typography.Text>
      </div>
    </>
  );
}

export default Step1Fields;
