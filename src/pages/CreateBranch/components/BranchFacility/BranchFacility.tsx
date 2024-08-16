import { useIntl } from "@umijs/max";
import {
  Checkbox,
  Collapse,
  CollapseProps,
  Empty,
  Form,
  FormInstance,
  GlobalToken,
  Row,
  Spin,
  theme,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";

interface IBranchFacilityProps {
  form: FormInstance<any>;
  mainFacilityList: TFacilityResponse[];
  isLoading?: boolean;
}

const getCollapseChildItems = (items: TFacilityItem[]) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg">
      {items.map((item) => {
        return (
          <Checkbox
            key={item.id}
            value={item.id}
            className="w-full p-2 rounded transition-effect hover:shadow-md"
          >
            {item.name}
          </Checkbox>
        );
      })}
    </div>
  );
};

const getActiveKey = (
  accommodationTypeList: TFacilityResponse[],
  ids: number[]
) => {
  const result: string[] = [];
  accommodationTypeList.forEach((item) => {
    const idItems = item.items.map((item) => item.id);
    if (ids.some((id) => idItems.includes(id))) {
      result.push(item.class);
    }
  });

  return result;
};

const getCollapseParentItems = (
  accommodationTypeList: TFacilityResponse[],
  token: GlobalToken
): CollapseProps["items"] => {
  return accommodationTypeList.map((item) => {
    return {
      key: item.class,
      label: <span className="text-lg font-semibold">{item.class}</span>,
      style: {
        marginBottom: 24,
        borderRadius: token.borderRadiusLG,
        border: "none",
      },
      children: getCollapseChildItems(item.items),
      className: "bg-primary-dominant-lighter",
    };
  });
};

function BranchFacility({
  form,
  mainFacilityList,
  isLoading,
}: IBranchFacilityProps) {
  const { token } = theme.useToken();
  const currentFacilities = form.getFieldValue("main_facilities") || [];
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const intl = useIntl();

  if (isLoading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

  if (mainFacilityList.length > 0) {
    const currentActiveKey =
      getActiveKey(mainFacilityList, currentFacilities) || [];
    return (
      <Form.Item
        name="main_facilities"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.mainFacility.required",
            }),
          },
        ]}
      >
        <Checkbox.Group className="w-full">
          <Collapse
            activeKey={activeKey.length > 0 ? activeKey : currentActiveKey}
            className="bg-transparent w-full"
            bordered={false}
            onChange={(key) => setActiveKey(key as string[])}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined className="mt-2" rotate={isActive ? 90 : 0} />
            )}
            items={getCollapseParentItems(mainFacilityList, token)}
          />
        </Checkbox.Group>
      </Form.Item>
    );
  } else {
    return <Empty />;
  }
}

export default BranchFacility;
