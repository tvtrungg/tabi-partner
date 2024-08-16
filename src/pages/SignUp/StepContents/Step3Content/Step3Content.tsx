import { FormattedMessage, useIntl, useNavigate } from "@umijs/max";
import { useState } from "react";
import {
  useGetPartnerInfo,
  setPartnerContractConfirmation,
  clearPartnerInfo,
} from "@/hooks/useSignUpForm";
import { usePostSignUp } from "@/services/auth/services";
import { Button, Form, Typography, Checkbox, message } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import Contract from "@/assets/files/contract.pdf";
import { COMPANY, SIGN_UP_RP_STEP2 } from "@/constants/link";

interface IPartnerInfo {
  username: string;
  full_name: string;
  paypal_support: boolean;
  email: string;
  phone: string;
  password: string;
  reenterPassword: string;
  company_name: string;
  short_name: string;
  description: string;
  tax_number: string;
  website_url: string;
  contractConfirmation: boolean;
}

function Step3Content() {
  const intl = useIntl();
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRegistrationValid, setIsRegistrationValid] = useState(false);

  const partnerInfo = useGetPartnerInfo();
  const { mutateAsync, isLoading } = usePostSignUp();

  const [messageApi, contextHolder] = message.useMessage();

  function validatePartnerRegistrationForm(partnerInfo: IPartnerInfo) {
    for (const key in partnerInfo) {
      if (partnerInfo.hasOwnProperty(key) && key !== "description") {
        const value = partnerInfo[key as keyof IPartnerInfo];
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          value === false
        ) {
          setIsRegistrationValid(false);
          return false;
        }
        if (partnerInfo.paypal_support === false && partnerInfo.email === "") {
          setIsRegistrationValid(true);
          return true;
        }
      }
    }
    setIsRegistrationValid(true);
    return true;
  }

  const error = () => {
    if (!isConfirmed) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({
          id: "signUp.steps.step4.form.confirmationError",
        }),
      });
    }
    if (isConfirmed && !isRegistrationValid) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({
          id: "signUp.steps.step4.form.registrationError",
        }),
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="w-full h-full flex flex-col items-center justify-start">
        <Typography.Title
          className="w-full h-auto flex flex-row items-center justify-start gap-5 ps-14"
          level={5}
        >
          <FileDoneOutlined />
          <FormattedMessage id="signUp.steps.step4.title" />
        </Typography.Title>
        <Form
          name="formSignUpStep3"
          className="w-full h-full px-2 flex flex-col items-center justify-start overflow-y-scroll"
        >
          <embed
            className="w-full min-h-[2000px] border-e-light overflow-y-visible"
            src={Contract}
          />
          <Checkbox
            className="my-2"
            onChange={(e) => {
              e.target.checked = !e.target.checked;
              setIsConfirmed(!isConfirmed);
            }}
          >
            <FormattedMessage id="signUp.steps.step4.form.agree" />
          </Checkbox>
          <div>
            <Button
              className="w-[100px] px-4 me-5"
              size="large"
              onClick={() => navigate(SIGN_UP_RP_STEP2)}
            >
              <FormattedMessage id="signUp.steps.buttonPrevious" />
            </Button>
            <Button
              className="w-[100px] px-4"
              htmlType="submit"
              type="primary"
              size="large"
              onClick={async () => {
                if (
                  isConfirmed &&
                  validatePartnerRegistrationForm(partnerInfo)
                ) {
                  setPartnerContractConfirmation(true);
                  await mutateAsync(partnerInfo);
                  clearPartnerInfo();
                  navigate(COMPANY);
                  
                } else {
                  error();
                }
              }}
              loading={isLoading}
            >
              <FormattedMessage id="signUp.steps.buttonRegister" />
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Step3Content;
