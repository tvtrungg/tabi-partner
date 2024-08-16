import { useState } from "react";
import {
  Collapse,
  CollapseProps,
  Empty,
  Form,
  FormInstance,
  GlobalToken,
  Radio,
  Row,
  Spin,
  theme,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./AccommodationType.less";

interface IAccommodationTypeProps {
  form: FormInstance<any>;
  accommodationTypeList: TAccommodationTypeResponse[];
  isLoading?: boolean;
}

const getCollapseChildItems = (items: TAccommodationChildren[]) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg">
      {items.map((item) => {
        return (
          <Radio
            key={item.id}
            value={item.id}
            className="border-none rounded-lg mb-3 h-fit transition-effect hover:shadow-md"
          >
            <span className="font-bold block mt-2 text-base">{item.label}</span>
            <p className="leading-5">{item.description}</p>
          </Radio>
        );
      })}
    </div>
  );
};

const getCollapseParentItems = (
  accommodationTypeList: TAccommodationTypeResponse[],
  token: GlobalToken
): CollapseProps["items"] => {
  return accommodationTypeList.map((item) => {
    return {
      key: item.id,
      label: (
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{item.label}</span>
          <span>{item.description}</span>
        </div>
      ),
      children: getCollapseChildItems(item.children),
      style: {
        marginBottom: 24,
        borderRadius: token.borderRadiusLG,
        border: "none",
      },
      className: "bg-primary-dominant-lighter",
    };
  });
};

const getCurrentActiveKey = (
  accommodationTypeList: TAccommodationTypeResponse[],
  typeID: number
) => {
  const result: string[] = [];
  accommodationTypeList.forEach((item) => {
    const idItems = item.children.map((item) => item.id);
    if (idItems.includes(typeID)) {
      result.push(item.id.toString());
    }
  });

  return result;
};

function AccommodationType({
  form,
  accommodationTypeList,
  isLoading,
}: IAccommodationTypeProps) {
  const { token } = theme.useToken();

  const currentType = form.getFieldValue("type_id") || 0;
  const currentActiveKey = getCurrentActiveKey(
    accommodationTypeList,
    currentType
  );

  const [activeKey, setActiveKey] = useState<string[]>([]);

  if (isLoading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

  return (
    <Form.Item
      name="type_id"
      rules={[
        {
          required: true,
          message: "Please select accommodation type",
        },
      ]}
    >
      {accommodationTypeList.length > 0 ? (
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          className="w-full accommodation-radio-group"
        >
          <Collapse
            activeKey={activeKey.length > 0 ? activeKey : currentActiveKey}
            className="bg-transparent"
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined className="mt-4" rotate={isActive ? 90 : 0} />
            )}
            items={getCollapseParentItems(accommodationTypeList, token)}
            onChange={(key) => {
              const lastItemIndex = key.length - 1;
              setActiveKey([key[lastItemIndex]]);
            }}
          />
        </Radio.Group>
      ) : (
        <Empty />
      )}
    </Form.Item>
  );
}

export default AccommodationType;
