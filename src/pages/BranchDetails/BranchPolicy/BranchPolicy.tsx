import { useUpdateBranchPolicy } from "@/services/branch/services";
import { Access, FormattedMessage, useIntl } from "@umijs/max";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { timeUnits } from "@/utils/timeUnits";

type TBranchPolicy = {
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

function BranchPolicy({ id, data, access, refetch }: TBranchPolicy) {
  const [form] = Form.useForm<TUpdateBranchPolicy>();
  const [isBIModalOpen, setIsBIModalOpen] = useState(false);
  const intl = useIntl();
  const { mutate } = useUpdateBranchPolicy(id);
  return (
    <>
      <div className="flex justify-between ">
        <h1 className="text-lg mb-3 font-bold">
          <FormattedMessage id="pages.branch_details.branch_policies.title" />
        </h1>
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

      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-medium mb-0">
            <FormattedMessage id="pages.branch_details.branch_policies.minimum_cancellation_period" />
            :
          </h3>
          <h2 className="mb-0 font-light text-sm">
            {data.cancellation_time_value} {data.cancellation_time_unit}
          </h2>
          <h2 className="mb-1 font-light text-sm"></h2>
        </div>
        <h3 className="font-medium">
          <FormattedMessage id="pages.branch_details.general_policy" />
        </h3>

        <pre className="mb-1 font-light text-sm w-full flex flex-wrap whitespace-pre-wrap">
          {data.general_policy}
        </pre>
      </div>
      <Access accessible={access.isRP || access.isHST}>
        <Modal
          title={
            <FormattedMessage id="pages.branch_details.branch_policies.edit_policy" />
          }
          open={isBIModalOpen}
          okText="Save"
          onCancel={() => {
            setIsBIModalOpen(false);
            form.resetFields();
          }}
          width={950}
          className="top-14"
          closeIcon={false}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                mutate(values, {
                  onSuccess: () => {
                    refetch();
                    setIsBIModalOpen(false);
                    message.success(
                      intl.formatMessage({
                        id: "pages.branch_details.branch_policies.edit_success",
                      })
                    );
                    form.resetFields();
                  },
                });
              })
              .catch(() => {});
          }}
        >
          <Form
            form={form}
            name="branch_policy_form"
            className="custom-info-form mt-5"
            initialValues={{
              cancellation_time_value: data.cancellation_time_value,
              cancellation_time_unit: data.cancellation_time_unit,
              general_policy: data.general_policy,
            }}
          >
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
                  const label = timeUnits.find(
                    (unit) => unit.value === value
                  )?.value;
                  form.setFieldsValue({
                    cancellation_time_unit: label,
                  });
                }}
              />
            </Form.Item>
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
              label={
                <FormattedMessage id="pages.createBranch.form.generalPolicy" />
              }
            >
              <Input.TextArea
                autoSize={{ minRows: 20, maxRows: 20 }}
                placeholder={intl.formatMessage({
                  id: "pages.createBranch.form.generalPolicy.placeholder",
                })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Access>
    </>
  );
}

export default BranchPolicy;
