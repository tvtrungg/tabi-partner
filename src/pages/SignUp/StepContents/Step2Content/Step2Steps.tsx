import { FormattedMessage } from "@umijs/max";
import { Typography } from "antd";
import { Step2BusinessInformation } from "./Step2StepContent";

export const Step2Steps: TSignUpStep[] = [
  {
    title: (
      <Typography.Text strong>
        <FormattedMessage id="signUp.steps.step3.form.businessInformation.label" />
      </Typography.Text>
    ),
    content: <Step2BusinessInformation />,
  },
];
