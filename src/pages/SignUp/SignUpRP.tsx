import { Steps } from "antd";
import { DEFAULT_STEP, SignUpSteps } from "./SignUpSteps";
import { Outlet, useLocation } from "@umijs/max";

function SignUpRP() {
  const location = useLocation();
  const pathname = location.pathname;
  const matchStep = pathname?.match(/step-(\d+)/);
  const currentStep = matchStep
    ? Number(matchStep[1]) || DEFAULT_STEP
    : DEFAULT_STEP;
  return (
    <>
      <Steps
        className="ant-steps-tracking"
        current={currentStep - 1}
        items={SignUpSteps}
      />
      <div className="w-full h-full text-center m-5 sign-up-form-content overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}

export default SignUpRP;
