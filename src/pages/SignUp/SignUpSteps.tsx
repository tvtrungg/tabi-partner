import { FormattedMessage } from "@umijs/max";

export const SignUpSteps: TSignUpStep[] = [
  {
    title: <FormattedMessage id="signUp.steps.step1.label" />,
    content: "First-content",
  },
  {
    title: <FormattedMessage id="signUp.steps.step3.label" />,
    content: "Second-content",
  },
  {
    title: <FormattedMessage id="signUp.steps.step4.label" />,
    content: "Third-content",
  },
];

export const DEFAULT_STEP = 0;
