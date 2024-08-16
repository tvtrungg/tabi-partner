import { useIntl, useNavigate } from "@umijs/max";
import { Button, Result } from "antd";
import React from "react";

const NoFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={useIntl().formatMessage({ id: "pages.404.subTitle" })}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          {useIntl().formatMessage({ id: "pages.404.buttonText" })}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
