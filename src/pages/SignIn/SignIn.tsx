import { FormattedMessage, useIntl } from "@umijs/max";
import { usePostSignIn } from "@/services/auth/services";
import Logo from "@/assets/logo/logo.png";
import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { MdOutlineLockPerson } from "react-icons/md";
import "./SignIn.less";
import { SIGN_UP } from "@/constants/link";
import { InfoCircleOutlined } from "@ant-design/icons";

const bgImage = require("@/assets/images/bg-landing.jpg");

function SignIn() {
  const intl = useIntl();
  const { mutate, isLoading } = usePostSignIn();
  return (
    <Row>
      <Col span={14} className="flex justify-center items-center p-5">
        <img src={bgImage} alt="bg-landing" className="w-full" />
      </Col>
      <Col
        span={10}
        className="h-full bg-white flex flex-col items-center justify-start sign-in-form-container px-9 translate-y-[12%]"
      >
        <div className="h-[150px] flex justify-center items-center mb-5">
          <img className="max-h-[100px]" src={Logo} alt="" />
        </div>
        <Form
          name="formSignIn"
          onFinish={(value: TSignInRequest) => {
            mutate(value);
          }}
          className="flex flex-col items-center justify-center sign-in-form max-w-[420px]"
        >
          <Form.Item
            // label={<FormattedMessage id="signIn.form.username.label" />}
            name="username"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "signIn.form.username.required",
                }),
              },
              {
                min: 4,
                message: intl.formatMessage({
                  id: "signIn.form.username.rule",
                }),
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: intl.formatMessage({
                  id: "pages.createBM.username.invalidFormat",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "signIn.form.username.placeholder",
              })}
              prefix={<UserOutlined />}
              className="w-full px-2 py-1"
              allowClear
            />
          </Form.Item>
          <Form.Item
            // label={<FormattedMessage id="signIn.form.password.label" />}
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "signIn.form.password.required",
                }),
              },
              {
                min: 4,
                message: intl.formatMessage({
                  id: "signIn.form.password.rule",
                }),
              },
            ]}
            className="mt-4"
          >
            <Input.Password
              placeholder={intl.formatMessage({
                id: "signIn.form.password.placeholder",
              })}
              className="w-full px-2 py-1"
              prefix={<MdOutlineLockPerson />}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="px-4 mt-5"
            size="large"
            loading={isLoading}
          >
            {<FormattedMessage id="signIn.buttonSignIn" />}
          </Button>
        </Form>
        <div className="flex flex-column flex-wrap justify-center items-center mt-3">
          <Typography.Text className="flex flex-column flex-wrap justify-center items-center">
            <FormattedMessage id="signIn.text1" />
            &nbsp;
            <Typography.Text
              className="text-primary-dominant-dark"
              strong={true}
            >
              <FormattedMessage id="signIn.termsOfService" />
              &nbsp;
            </Typography.Text>
            <FormattedMessage id="signIn.and" />
            &nbsp;
            <Typography.Text
              className="text-primary-dominant-dark"
              strong={true}
            >
              <FormattedMessage id="signIn.privacyPolicy" />
            </Typography.Text>
          </Typography.Text>
          <Typography.Text>
            <FormattedMessage id="signIn.text2" />
            <Typography.Text
              className="text-primary-dominant-dark"
              strong={true}
            >
              Tabi
            </Typography.Text>
            ?{" "}
            <Typography.Link
              className="text-primary-dominant-dark h-4"
              strong={true}
              href={SIGN_UP}
            >
              <FormattedMessage id="signIn.buttonSignUp" />
            </Typography.Link>
          </Typography.Text>
        </div>

        <div className="w-full rounded-md bg-neutral-100 mt-8 flex items-center justify-start gap-x-2 p-2 text-neutral-400 text-sm">
          <div>
            <InfoCircleOutlined />
          </div>
          <FormattedMessage id="versionNote" />
        </div>
      </Col>
    </Row>
  );
}

export default SignIn;
