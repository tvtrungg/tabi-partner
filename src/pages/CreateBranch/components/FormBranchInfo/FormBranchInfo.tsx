import { FormattedMessage, useIntl } from "@umijs/max";
import { Divider, Form, FormInstance, Input, Radio, Select } from "antd";
import "./FormBranchInfo.less";
import LocationSelect from "@/components/core/LocationSelect";
import Note from "@/components/common/Note";
import { timeUnits } from "@/utils/timeUnits";

interface IFormBranchInfoProps {
  form: FormInstance<any>;
  displayTaxNumber?: boolean;
}

function FormBranchInfo({ form, displayTaxNumber }: IFormBranchInfoProps) {
  const intl = useIntl();

  return (
    <div className="branch-info-form">
      <Form.Item
        name="branch_name"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.branchName.required",
            }),
          },
        ]}
        label={<FormattedMessage id="pages.createBranch.form.branchName" />}
      >
        <Input
          className="px-2 py-1"
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.branchName.placeholder",
          })}
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.description.required",
            }),
          },
        ]}
        label={<FormattedMessage id="pages.createBranch.form.description" />}
      >
        <Input.TextArea
          rows={3}
          allowClear
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.description.placeholder",
          })}
          classNames={{
            textarea: "px-2 py-1",
          }}
        />
      </Form.Item>
      <Form.Item
        name="reception_area"
        label={intl.formatMessage({
          id: "pages.createBranch.form.receptionArea",
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.receptionArea.required",
            }),
          },
        ]}
      >
        <Radio.Group>
          <Radio value={true}>
            <FormattedMessage id="pages.createBranch.form.receptionArea.available" />
          </Radio>
          <Radio value={false}>
            <FormattedMessage id="pages.createBranch.form.receptionArea.notAvailable" />
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.address.required",
            }),
          },
        ]}
        label={<FormattedMessage id="pages.createBranch.form.address" />}
      >
        <Input
          className="px-2 py-1"
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.address.placeholder",
          })}
        />
      </Form.Item>
      <LocationSelect form={form} />
      {displayTaxNumber && (
        <>
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
        </>
      )}
      <Divider orientation="left">
        <FormattedMessage id="pages.createBranch.form.divider.policies" />
      </Divider>
      <Note>
        <FormattedMessage id="pages.createBranch.note.cancelPolicy" />
      </Note>
      <Form.Item
        name="cancellation_time_value"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.cancellationTimeValue.required",
            }),
          },
        ]}
        label={
          <FormattedMessage id="pages.createBranch.form.cancellationTimeValue" />
        }
      >
        <Input
          placeholder="1,2,3,..."
          className="px-2 py-1 h-8"
          type="number"
          min={1}
          onChange={(event) => {
            const value = event.target.value;
            form.setFieldsValue({
              cancellation_time_value: Number(value.replace(/\D/g, "")),
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name="cancellation_time_unit"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.cancellationTimeUnit.required",
            }),
          },
        ]}
        label={
          <FormattedMessage id="pages.createBranch.form.cancellationTimeUnit" />
        }
      >
        <Select
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.cancellationTimeUnit",
          })}
          showSearch
          options={timeUnits}
          onChange={(value) => {
            const label = timeUnits.find((unit) => unit.value === value)?.value;
            form.setFieldsValue({
              cancellation_time_unit: label,
            });
          }}
        />
      </Form.Item>
      <Note>
        <FormattedMessage id="pages.createBranch.note.generalPolicy" />
      </Note>
      <Form.Item
        name="general_policy"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.generalPolicy.required",
            }),
          },
        ]}
        label={<FormattedMessage id="pages.createBranch.form.generalPolicy" />}
      >
        <Input.TextArea
          className="px-2 py-1"
          rows={4}
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.generalPolicy.placeholder",
          })}
        />
      </Form.Item>
    </div>
  );
}

export default FormBranchInfo;
