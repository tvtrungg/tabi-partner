import {
  useGetCompanyBookingAnalysis,
  useGetInfoCompany,
  useGetCompanyRevenueAnalysis,
  useUpdateInfoCompany,
} from "@/services/company/services";
import { FormattedMessage, useIntl } from "@umijs/max";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Spin,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./Company.less";
import ChartAnalysis from "@/components/common/ChartAnalysis";
import { useTransparentBackground } from "@/hooks/useTransparentBackground";

function Company() {
  useTransparentBackground();
  const [form] = Form.useForm<TCompany>();
  const intl = useIntl();

  const [editForm, setEditForm] = useState(false);
  const [initialData, setInitialData] = useState<any>({});
  const currentYear = new Date().getFullYear();
  const [yearRevenue, setYearRevenue] = useState<string>(String(currentYear));
  const [yearBooking, setYearBooking] = useState<string>(String(currentYear));

  const { data, isLoading, refetch } = useGetInfoCompany();

  const [showEmail, setShowEmail] = useState(false);

  const { data: revenueDataAnalysis, isLoading: revenueLoading } =
    useGetCompanyRevenueAnalysis(yearRevenue);
  const { data: bookingDataAnalysis, isLoading: bookingLoading } =
    useGetCompanyBookingAnalysis(yearBooking);

  const { mutate } = useUpdateInfoCompany(() => {
    refetch();
    message.success(
      intl.formatMessage({
        id: "pages.company.updated_successfully",
      })
    );
    setEditForm(false);
  });

  useEffect(() => {
    if (data?.representative?.email) {
      setShowEmail(true);
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      ...data,
      representative: {
        ...data.representative,
      },
    });
  }, [data, form]);

  if (isLoading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

  return (
    <div className="flex justify-between gap-5">
      <div className="box-custom w-[40%]">
        <Form
          form={form}
          name="representative_form"
          className="custom-info-form company-info-form"
        >
          <div className="w-full representative-info">
            <h1 className="text-xl mb-5 font-bold">
              <FormattedMessage id="pages.company.divider.representative" />
            </h1>

            {[
              { name: "name", labelId: "representative.name" },
              { name: "username", labelId: "representative.username" },
            ].map((field) => (
              <Form.Item
                key={field.name}
                name={["representative", field.name]}
                label={intl.formatMessage({
                  id: `pages.company.form.${field.labelId}.label`,
                })}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: `pages.company.form.${field.labelId}.placeholder`,
                  })}
                  className="px-2 py-1"
                  disabled
                />
              </Form.Item>
            ))}
            <Form.Item
              name={["representative", "phone"]}
              label={<FormattedMessage id="pages.createBM.phone.label" />}
            >
              <InputNumber
                className="w-full px-2 py-1"
                placeholder={intl.formatMessage({
                  id: "pages.company.form.representative.phone.placeholder",
                })}
                disabled
              />
            </Form.Item>
          </div>
        </Form>
        <Form
          form={form}
          name="company_info_form"
          className="custom-info-form company-info-form mt-5"
        >
          <div className="w-full">
            <div className="flex justify-between mb-5">
              <h1 className="text-xl mb-5 font-bold">
                <FormattedMessage id="pages.company.divider.company" />
              </h1>
              {!editForm && (
                <button
                  type="button"
                  className="h-8 w-8 p-0 bg-transparent hover:text-primary-dominant-light cursor-pointer border-none"
                  onClick={() => {
                    setEditForm(!editForm);
                    setInitialData(form.getFieldsValue());
                  }}
                >
                  <FiEdit className="text-2xl" />
                </button>
              )}
            </div>
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
              initialValue={data?.representative.email ? true : false}
            >
              <Radio.Group
                onChange={(e) => {
                  setShowEmail(e.target.value);
                }}
                className="py-2"
                disabled={!editForm}
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
                name={["representative", "email"]}
                label={
                  <FormattedMessage id="pages.company.form.representative.email.label" />
                }
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: `pages.company.form.representative.email.required`,
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
                    id: "pages.company.form.representative.email.placeholder",
                  })}
                  className="px-2 py-1 mb-1"
                  disabled={!editForm}
                />
              </Form.Item>
            )}

            {[
              { name: "company_name", labelId: "company_name" },
              { name: "short_name", labelId: "short_name" },
              { name: "tax_number", labelId: "tax_number" },
            ].map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: `pages.company.form.${field.labelId}.required`,
                    }),
                  },
                ]}
                label={intl.formatMessage({
                  id: `pages.company.form.${field.labelId}.label`,
                })}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: `pages.company.form.${field.labelId}.placeholder`,
                  })}
                  className="px-2 py-1 mb-1"
                  disabled={!editForm}
                />
              </Form.Item>
            ))}
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
                disabled={!editForm}
                placeholder={intl.formatMessage({
                  id: "signUp.steps.step3.form.businessInformation.website.placeholder",
                })}
                className="px-2 py-1"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={
                <FormattedMessage id="pages.company.form.description.label" />
              }
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "pages.company.form.description.required",
                  }),
                },
              ]}
            >
              <Input.TextArea
                autoSize={{ minRows: 5, maxRows: 5 }}
                placeholder={intl.formatMessage({
                  id: "pages.company.form.description.placeholder",
                })}
                className="px-2 py-1"
                disabled={!editForm}
              />
            </Form.Item>
            {editForm && (
              <div className="flex flex-row-reverse mt-5">
                <Button
                  type="primary"
                  className="px-3"
                  loading={isLoading}
                  onClick={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        if (!showEmail) {
                          values.representative.email = "";
                        }
                        mutate({
                          ...values,
                          email: values.representative.email,
                        });
                      })
                      .catch(() => {});
                  }}
                >
                  <FormattedMessage id="pages.createBranch.button.submit" />
                </Button>
                <Button
                  className="mr-2 px-3"
                  onClick={() => {
                    setEditForm(false);
                    form.setFieldsValue(initialData);
                  }}
                >
                  <FormattedMessage id="cancel" />
                </Button>
              </div>
            )}
          </div>
        </Form>
      </div>

      <div className="flex flex-col box-custom gap-5 w-[60%]">
        <ChartAnalysis
          data={revenueDataAnalysis}
          isLoading={revenueLoading}
          title="pages.company.analysis.title_revenue"
          type="revenue"
          year={yearRevenue}
          setYear={setYearRevenue}
        />

        <ChartAnalysis
          data={bookingDataAnalysis}
          isLoading={bookingLoading}
          title="pages.company.analysis.title_booking"
          type="booking"
          year={yearBooking}
          setYear={setYearBooking}
        />
      </div>
    </div>
  );
}

export default Company;
