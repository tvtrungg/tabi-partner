import { FormattedMessage, useNavigate } from "@umijs/max";
import { useEffect } from "react";
import {
  setPartnerCompanyInfo,
  useGetPartnerInfo,
} from "@/hooks/useSignUpForm";
import { Button, Form, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { Step2Steps } from "./Step2Steps";
import cloneDeep from "lodash/cloneDeep";
import { SIGN_UP_RP_STEP1, SIGN_UP_RP_STEP3 } from "@/constants/link";

function Step2Content() {
  const navigate = useNavigate();
  const partnerInfo = useGetPartnerInfo();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(cloneDeep(partnerInfo));
  }, [form, partnerInfo]);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <Typography.Title
        className="w-full h-auto flex flex-row items-center justify-start gap-5 ps-14"
        level={5}
      >
        <ProfileOutlined />
        <FormattedMessage id="signUp.steps.step3.title" />
      </Typography.Title>
      <Form
        name="formSignUpStep2"
        form={form}
        className="w-full h-full flex flex-col items-center justify-start"
      >
        <div className="w-full h-full flex items-start justify-start gap-2 mt-2">
          <div className="w-full">{Step2Steps[0].content}</div>
        </div>
        <div className="mt-5">
          <>
            <Button
              className="w-[100px] px-4 me-5"
              size="large"
              onClick={() => navigate(SIGN_UP_RP_STEP1)}
            >
              <FormattedMessage id="signUp.steps.buttonPrevious" />
            </Button>
            <Button
              className="w-[100px] px-4"
              htmlType="submit"
              type="primary"
              size="large"
              onClick={() => {
                form
                  .validateFields()
                  .then((value: TSignUpStep2Request) => {
                    setPartnerCompanyInfo(value);
                    navigate(SIGN_UP_RP_STEP3);
                  })
                  .catch(() => {});
              }}
            >
              <FormattedMessage id="signUp.steps.buttonNext" />
            </Button>
          </>
        </div>
      </Form>
    </div>
  );
}

export default Step2Content;
