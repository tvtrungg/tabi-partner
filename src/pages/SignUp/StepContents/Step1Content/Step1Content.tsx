import { FormattedMessage, useNavigate } from "@umijs/max";
import { useEffect } from "react";
import {
  useGetPartnerInfo,
  setPartnerAccountInfo,
} from "@/hooks/useSignUpForm";
import { Button, Form, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cloneDeep from "lodash/cloneDeep";
import { SIGN_UP, SIGN_UP_RP_STEP2 } from "@/constants/link";
import Step1Fields from "./Step1Fields";

function Step1Content() {
  const navigate = useNavigate();
  const partnerInfo = useGetPartnerInfo();

  const [form] = Form.useForm<TSignUpStep1Request>();
  useEffect(() => {
    form.setFieldsValue(cloneDeep(partnerInfo) as TSignUpStep1Request);
  }, [form]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <Typography.Title
        className="w-full h-auto flex flex-row items-center justify-start gap-5 ps-14"
        level={5}
      >
        <UserOutlined />
        <FormattedMessage id="signUp.steps.step1.title" />
      </Typography.Title>
      <Form
        name="formSignUpStep1"
        form={form}
        className="w-full h-full flex flex-col items-center justify-start "
      >
        <Step1Fields paypal_support={partnerInfo.paypal_support} />

        <div className="mt-5">
          <Button
            className="w-[100px] px-4 me-5"
            size="large"
            onClick={() => navigate(SIGN_UP)}
          >
            <FormattedMessage id="signUp.steps.buttonPrevious" />
          </Button>
          <Button
            className="w-[100px] px-4 mt-5"
            htmlType="submit"
            type="primary"
            size="large"
            onClick={() => {
              form
                .validateFields()
                .then((value: TSignUpStep1Request) => {
                  setPartnerAccountInfo(value);
                  navigate(SIGN_UP_RP_STEP2);
                })
                .catch(() => {});
            }}
          >
            <FormattedMessage id="signUp.steps.buttonNext" />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Step1Content;
