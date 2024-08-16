import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Tag,
  message,
} from "antd";
import { Access, FormattedMessage, useIntl } from "@umijs/max";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoPersonOutline, IoBedOutline } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdOutlineSubtitles } from "react-icons/md";
import { TbArrowAutofitWidth } from "react-icons/tb";
import { BiRuler } from "react-icons/bi";
import BedTypeOptions from "@/components/core/BedTypeOptions";
import {
  useUpdateRoomInfo,
  useUpdateRoomStatus,
} from "@/services/room/services";
import { formatCurrency } from "@/utils/common";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { APPROVED, PENDING, REJECTED, UPDATED } from "@/constants/status";
import { EN_LOCALE } from "@/constants/locale";

type TRoomInfoProps = {
  id: number;
  data: TRoomDetails;
  locale: string;
  access: {
    isRP: boolean;
    isBM: boolean;
    isHST: boolean;
  };
  refetch: () => void;
};

function RoomInfo({ id, data, locale, access, refetch }: TRoomInfoProps) {
  const intl = useIntl();
  const [isBIModalOpen, setIsBIModalOpen] = useState(false);
  const [form] = Form.useForm<TRoomDetails>();
  const { mutate } = useUpdateRoomInfo(id);

  const { mutate: mutateApproveRoom } = useUpdateRoomStatus(
    id,
    APPROVED,
    () => {
      refetch();
      message.success(
        intl.formatMessage({
          id: "pages.room_details.room_info.approve_success",
        })
      );
    }
  );
  const { mutate: mutateRejectRoom } = useUpdateRoomStatus(id, REJECTED, () => {
    refetch();
    message.success(
      intl.formatMessage({
        id: "pages.room_details.room_info.reject_success",
      })
    );
  });

  const renderDetail = (
    formatMessage: string,
    value: string | number,
    IconComponent?: any
  ) => {
    if (typeof value === "number") {
      // eslint-disable-next-line no-param-reassign
      value = formatCurrency(value);
    }
    return (
      <div className="mb-4 flex items-center gap-2">
        {IconComponent && <IconComponent className="text-base" />}
        <Row gutter={24} className="w-full items-center">
          <Col span={10} className="font-normal text-sm">
            <FormattedMessage id={formatMessage} /> :
          </Col>
          <Col
            span={10}
            className="ml-2 font-light text-sm hover:text-slate-500"
          >
            {value}
          </Col>
        </Row>
      </div>
    );
  };

  const renderBedTypeDetail = () => {
    const priceValue =
      locale === EN_LOCALE ? data.bed_type.label_en : data.bed_type.label_vi;
    return renderDetail(
      "pages.room_details.bed_type",
      priceValue,
      IoBedOutline
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-bold mb-5">
        <FormattedMessage id="pages.room_details.room_info.title" />
        <div className="float-right">
          {(() => {
            switch (data.status) {
              case PENDING:
                return (
                  <Tag color="blue" className="p-1 text-xs italic align-top">
                    <FormattedMessage id="status.pending" />
                  </Tag>
                );
              case APPROVED:
                return (
                  <Tag
                    color="green"
                    className="p-1 text-xs italic align-top text-green-500"
                  >
                    <FormattedMessage id="status.approved" />
                  </Tag>
                );
              case UPDATED:
                return (
                  <Tag color="warning" className="p-1 text-xs italic align-top">
                    <FormattedMessage id="status.updated" />
                  </Tag>
                );
              default:
                return null;
            }
          })()}
          <Access accessible={access.isBM || access.isHST}>
            <button
              type="button"
              onClick={() => setIsBIModalOpen(true)}
              className="h-8 w-8 p-0 bg-transparent hover:text-primary-dominant-light cursor-pointer border-none"
            >
              <FiEdit className="text-2xl" />
            </button>
          </Access>
        </div>
      </h1>
      {renderDetail(
        "pages.room_details.room_name",
        data.room_name,
        MdOutlineSubtitles
      )}
      <div>
        {renderDetail(
          "pages.room_details.width",
          data.width,
          TbArrowAutofitWidth
        )}
        {renderDetail("pages.room_details.length", data.length, BiRuler)}
        {renderDetail(
          "pages.room_details.max_occupancy",
          data.max_occupancy,
          IoPersonOutline
        )}
        {renderDetail(
          "pages.room_details.quantity",
          data.quantity,
          AiOutlineFieldNumber
        )}
        {renderBedTypeDetail()}
        {data.status === PENDING && (
          <Access accessible={access.isRP || access.isHST}>
            <div className="flex justify-between items-center gap-2 mt-8 text-center">
              <Popconfirm
                title={
                  <FormattedMessage id="pages.room_details.room_info.approve_title" />
                }
                description={
                  <FormattedMessage id="pages.room_details.room_info.approve_confirm" />
                }
                icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                onConfirm={() => {
                  mutateApproveRoom();
                }}
                cancelText={<FormattedMessage id="cancel" />}
                okText={<FormattedMessage id="approve" />}
              >
                <button
                  type="button"
                  className="basis-[70%] w-full h-9 font-semibold border-none rounded-lg text-white bg-green-500 hover:bg-green-400 cursor-pointer"
                >
                  <FormattedMessage id="approve" />
                  <FaRegCheckCircle className="text-base ml-2 align-bottom" />
                </button>
              </Popconfirm>
              <Popconfirm
                title={
                  <FormattedMessage id="pages.room_details.room_info.reject_title" />
                }
                description={
                  <FormattedMessage id="pages.room_details.room_info.reject_confirm" />
                }
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => {
                  mutateRejectRoom();
                }}
                cancelText={<FormattedMessage id="cancel" />}
                okText={<FormattedMessage id="agree" />}
              >
                <Button
                  type="primary"
                  className="basis-[30%] h-9 font-medium rounded-lg"
                >
                  <FormattedMessage id="reject" />
                  <FaRegTimesCircle className="text-base ml-2 align-middle" />
                </Button>
              </Popconfirm>
            </div>
          </Access>
        )}
      </div>

      <Modal
        title={
          <FormattedMessage id="pages.room_details.room_info.modal_title" />
        }
        open={isBIModalOpen}
        okText="Save"
        onCancel={() => {
          setIsBIModalOpen(false);
          form.resetFields();
        }}
        closeIcon={true}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              mutate(values, {
                onSuccess: () => {
                  refetch();
                  setIsBIModalOpen(false);
                  message.success(
                    intl.formatMessage({
                      id: "pages.room_details.room_info.edit_success",
                    })
                  );
                  form.resetFields();
                },
              });
            })
            .catch(() => {});
        }}
      >
        <Form
          form={form}
          name="room_info_form"
          initialValues={{
            room_name: data.room_name,
            bed_type_id: data.bed_type.id,
            max_occupancy: data.max_occupancy,
            width: data.width,
            length: data.length,
            quantity: data.quantity,
          }}
          className="custom-info-form mt-5"
        >
          <Form.Item
            name="room_name"
            label={
              <FormattedMessage id="pages.room_details.room_info.room_name.label" />
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.room_details.room_info.room_name.required",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "pages.room_details.room_info.room_name.label",
              })}
            />
          </Form.Item>
          <Form.Item
            name="width"
            label={
              <FormattedMessage id="pages.room_details.room_info.width.label" />
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.room_details.room_info.width.required",
                }),
              },
            ]}
          >
            <InputNumber
              className="w-full"
              min={1}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder={intl.formatMessage({
                id: "pages.room_details.room_info.width.label",
              })}
            />
          </Form.Item>
          <Form.Item
            name="length"
            label={
              <FormattedMessage id="pages.room_details.room_info.length.label" />
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.room_details.room_info.length.required",
                }),
              },
            ]}
          >
            <InputNumber
              className="w-full"
              min={1}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder={intl.formatMessage({
                id: "pages.room_details.room_info.length.label",
              })}
            />
          </Form.Item>
          <Form.Item
            name="max_occupancy"
            label={
              <FormattedMessage id="pages.room_details.room_info.max_occupancy.label" />
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.room_details.room_info.max_occupancy.required",
                }),
              },
            ]}
            className="justify-between items-center gap-2 mt-8 text-center"
          >
            <InputNumber
              className="w-full"
              min={1}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder={intl.formatMessage({
                id: "pages.room_details.room_info.max_occupancy.label",
              })}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label={
              <FormattedMessage id="pages.room_details.room_info.quantity.label" />
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.room_details.room_info.quantity.required",
                }),
              },
            ]}
            className="justify-between items-center gap-2 mt-8 text-center"
          >
            <InputNumber
              className="w-full"
              min={1}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder={intl.formatMessage({
                id: "pages.room_details.room_info.quantity.label",
              })}
            />
          </Form.Item>

          <BedTypeOptions />
        </Form>
      </Modal>
    </div>
  );
}

export default RoomInfo;
