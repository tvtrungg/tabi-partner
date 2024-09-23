import { FormattedMessage, Access, useIntl } from "@umijs/max";
import {
  MdOutlineBeachAccess,
  MdOutlineWeekend,
  MdOutlineToday,
  MdOutlineBookOnline,
  MdOutlineAttachMoney,
} from "react-icons/md";

import { IoCashOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row, message } from "antd";
import { FiEdit } from "react-icons/fi";
import PricingStep from "@/pages/CreateRoom/components/PricingStep";
import { formatCurrency } from "@/utils/common";
import { useUpdateRoomPriceDetails } from "@/services/room/services";
import "./PriceDetails.less";
import {
  formPriceDetailsKeys,
  getUpdatePriceDetails,
} from "@/services/room/utils";

type TPriceDetailsProps = {
  id: number;
  data: TRoomDetails;
  access: {
    isRP: boolean;
    isBM: boolean;
    isHST: boolean;
  };
  refetch: () => void;
};

const PriceDetails: React.FC<TPriceDetailsProps> = ({
  id,
  data,
  access,
  refetch,
}) => {
  const intl = useIntl();
  const [editRoomPrices, setEditRoomPrices] = useState<boolean>(false);
  const [form] = Form.useForm<any>();
  const { mutate } = useUpdateRoomPriceDetails(id);

  const renderDetail = (
    formatMessage: string,
    value: string | number,
    className?: string,
    IconComponent?: React.ElementType
  ) => {
    let newValue: string | number = value;
    if (typeof value === "number") {
      return (newValue = formatCurrency(value.toString()));
    }
    return (
      <div className={`${className} flex gap-2`}>
        {IconComponent && <IconComponent className="text-base mt-1" />}
        <div className="w-full flex justify-between font-normal mb-1 text-sm">
          <FormattedMessage id={formatMessage} /> :
          <span className="ml-2 font-light text-sm">{newValue}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        max_price: formatCurrency(String(data.max_price)),
        online_method: data.facture_reduction.online_method,
        on_cash_method: data.facture_reduction.on_cash_method,
        normal_day: data.facture_reduction.normal_day,
        holiday: data.facture_reduction.holiday,
        weekend: data.facture_reduction.weekend,
        reservation_reduction: data.reservation_reductions,
      });
    }
  }, [form, data]);

  return (
    <div className="box-custom">
      <div className="flex justify-between items-start mb-0">
        <h1 className="text-lg font-bold">
          <FormattedMessage id="pages.room_details.price_details" />
        </h1>
        <Access accessible={access.isBM || access.isHST}>
          <button
            type="button"
            onClick={() => setEditRoomPrices(true)}
            className="h-8 w-8 bg-transparent hover:text-primary-dominant-light cursor-pointer border-none"
          >
            <FiEdit className="text-xl" />
          </button>
        </Access>
      </div>

      <Row gutter={24}>
        <Col
          span={7}
          className="border-solid border-neutral-100 border-0 border-r-2"
        >
          <h2 className="text-sm font-medium mb-5 mt-0">
            <FormattedMessage id="pages.room_details.facture_reduction.title" />
          </h2>
          <div className="flex flex-col gap-3">
            {renderDetail(
              "pages.room_details.max_price",
              data.max_price,
              "",
              MdOutlineAttachMoney
            )}
            {renderDetail(
              "pages.room_details.facture_reduction.online_method",
              `${data.facture_reduction.online_method} %`,
              "",
              MdOutlineBookOnline
            )}
            {renderDetail(
              "pages.room_details.facture_reduction.on_cash_method",
              `${data.facture_reduction.on_cash_method} %`,
              "",
              IoCashOutline
            )}
            {renderDetail(
              "pages.room_details.facture_reduction.normal_day",
              `${data.facture_reduction.normal_day} %`,
              "",
              MdOutlineToday
            )}
            {renderDetail(
              "pages.room_details.facture_reduction.weekend",
              `${data.facture_reduction.weekend} %`,
              "",
              MdOutlineWeekend
            )}
            {renderDetail(
              "pages.room_details.facture_reduction.holiday",
              `${data.facture_reduction.holiday} %`,
              "",
              MdOutlineBeachAccess
            )}
          </div>
        </Col>

        <Col span={17}>
          <h2 className="text-sm font-medium mb-5 mt-0">
            <FormattedMessage id="pages.room_details.reservation_reductions.title" />
          </h2>
          <Row className="h-[80%]">
            <Col
              span={5}
              className="flex flex-col gap-3 justify-center bg-base-bg-light p-4 shadow-table rounded-tl-md rounded-br-md"
            >
              <h3 className="font-medium text-sm">
                <FormattedMessage id="pages.room_details.reservation_reductions.quantity" />
              </h3>
              <h3 className="font-medium text-sm">
                <FormattedMessage id="pages.room_details.reservation_reductions.time_unit" />
              </h3>
              <h3 className="font-medium text-sm">
                <FormattedMessage id="pages.room_details.reservation_reductions.reduction" />
              </h3>
            </Col>

            <Col span={19} className="overflow-hidden max-w-[390px]">
              <div className="h-full px-5 scroll-without-scrollbar flex items-center gap-6 border-solid rounded-tr-md rounded-br-md border-neutral-200 border-[1px]">
                {data.reservation_reductions.map((item, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <h3 className="text-sm font-light">{item.quantity}</h3>
                    <h3 className="text-sm font-light lowercase">
                      {item.time_unit}
                    </h3>
                    <h3 className="text-sm font-light">{item.reduction} %</h3>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Form form={form}>
        <Modal
          centered
          open={editRoomPrices}
          closable={false}
          okText="Save"
          onCancel={() => setEditRoomPrices(false)}
          width={1300}
          className="top-5"
          onOk={() => {
            form
              .validateFields()
              .then(() => {
                const req = getUpdatePriceDetails(
                  form.getFieldsValue(formPriceDetailsKeys)
                );
                mutate(req, {
                  onSuccess: () => {
                    form.resetFields();
                    refetch();
                    setEditRoomPrices(false);
                    message.success(
                      intl.formatMessage({
                        id: "pages.room_details.edit_price_details.update_success",
                      })
                    );
                  },
                });
              })
              .catch(() => {});
          }}
        >
          <div className="create-room-form">
            <PricingStep form={form} horizontal />
          </div>
        </Modal>
      </Form>
    </div>
  );
};

export default PriceDetails;
