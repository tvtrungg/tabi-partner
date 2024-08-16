import { FormattedMessage, useIntl } from "@umijs/max";
import { Form, Input } from "antd";
import "./Step2StepContent.less";

const Step2BusinessInformation = () => {
  const intl = useIntl();

  return (
    <div className="w-full h-full flex flex-col items-start justify-start step-3-form">
      <Form.Item
        label={
          <FormattedMessage id="signUp.steps.step3.form.businessInformation.companyName.label" />
        }
        name="company_name"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "signUp.steps.step3.form.businessInformation.companyName.required",
            }),
          },
        ]}
        className="w-full h-auto flex items-start justify-between"
      >
        <Input
          placeholder={intl.formatMessage({
            id: "signUp.steps.step3.form.businessInformation.companyName.placeholder",
          })}
          className=" px-2 py-1"
          allowClear
        />
      </Form.Item>
      <Form.Item
        label={
          <FormattedMessage id="signUp.steps.step3.form.businessInformation.shortName.label" />
        }
        name="short_name"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "signUp.steps.step3.form.businessInformation.shortName.required",
            }),
          },
        ]}
        className="w-full h-auto flex items-start justify-between mt-2"
      >
        <Input
          placeholder={intl.formatMessage({
            id: "signUp.steps.step3.form.businessInformation.shortName.placeholder",
          })}
          className="px-2 py-1"
          allowClear
        />
      </Form.Item>
      <Form.Item
        label={
          <FormattedMessage id="signUp.steps.step3.form.businessInformation.description.label" />
        }
        name="description"
        className="w-full h-auto flex items-start justify-between mt-2"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "signUp.steps.step3.form.businessInformation.description.required",
            }),
          },
        ]}
      >
        <Input.TextArea
          rows={3}
          placeholder={intl.formatMessage({
            id: "signUp.steps.step3.form.businessInformation.description.placeholder",
          })}
          className=" px-2 py-1 input-textarea"
          allowClear
        />
      </Form.Item>
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
        className="w-full h-auto flex items-start justify-between mt-2"
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
        className="w-full h-auto flex items-start justify-between mt-2"
      >
        <Input
          placeholder={intl.formatMessage({
            id: "signUp.steps.step3.form.businessInformation.website.placeholder",
          })}
          className="px-2 py-1"
          allowClear
        />
      </Form.Item>
    </div>
  );
};

export default Step2BusinessInformation;
