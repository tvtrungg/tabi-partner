import { HIGHLIGHTER_PROPS, PAGE_LIMIT } from "@/constants/table";
import { ROOMS } from "@/constants/link";
import { FormattedMessage, useIntl, useNavigate } from "@umijs/max";
import Highlighter from "react-highlight-words";
import {
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import { Fragment, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { formatDate } from "@/utils/convert_timestamp";
import { formatCurrency } from "@/utils/common";
import {
  useApproveBooking,
  useGetBookings,
  useRejectBooking,
} from "@/services/booking/services";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  APPROVED,
  CASH,
  ONLINE,
  PENDING,
  REJECTED,
  UPDATED,
  CANCELLED,
} from "@/constants/status";

import "./Bookings.less";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import FilterTable from "@/components/core/FilterTable";
import SearchTable from "@/components/core/SearchTable";
import { IoIosDocument } from "react-icons/io";
import { usePagination } from "@/utils/usePagination";
const { Text } = Typography;

export type HighlightSearchColumn = {
  highLightText: string;
  dataIndex: string;
};

const statusMap: { [key: string]: { text: string; color: string } } = {
  PEN: { text: "status.pending", color: "blue" },
  APP: { text: "status.approved", color: "green" },
  REJ: { text: "status.rejected", color: "red" },
  CAN: { text: "status.cancelled", color: "magenta" },
  REV: { text: "status.review", color: "warning" },
  COM: { text: "status.complete", color: "success" },
  default: { text: "status.updated", color: "gold" },
};

function Bookings() {
  const intl = useIntl();
  const navigate = useNavigate();
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);

  const [highlightSearchColumn, setHighlightSearchColumn] = useState<
    HighlightSearchColumn[]
  >([
    {
      highLightText: "",
      dataIndex: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<number | null>(null);
  const [rejectBookingId, setRejectBookingId] = useState<number | null>(null);
  const [form] = Form.useForm<TRejectRequest>();
  const [filter, setFilter] = useState<{ [key: string]: any }>({});
  const isFilterNotEmpty = Object.keys(filter).length > 0;

  const { currentPage, handlePageChanges } = usePagination();

  const { data, isLoading, refetch } = useGetBookings(
    pageLimit,
    currentPage,
    filter
  );

  const { mutate: mutateApproveStatus } = useApproveBooking();
  const { mutate: mutateRejectStatus } = useRejectBooking();

  const GuestInfoTooltip = (record: TBookingsList) => (
    <div className="px-3">
      <h2 className="text-center">
        {record.user.first_name} {record.user.last_name}
      </h2>
      <div className="flex justify-center gap-5 my-3">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">
            <FormattedMessage id="pages.booking.tooltip.username" />:
          </span>
          <span className="font-semibold">
            <FormattedMessage id="pages.booking.tooltip.dob" />:
          </span>
          <span className="font-semibold">
            <FormattedMessage id="pages.booking.tooltip.email" />:
          </span>
          <span className="font-semibold">
            <FormattedMessage id="pages.booking.tooltip.phone" />:
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-normal">{record.user.username}</span>
          <span className="font-normal">{formatDate(record.user.dob)}</span>
          <span className="font-normal">{record.user.email}</span>
          <span className="font-normal">{record.user.phone}</span>
        </div>
      </div>
    </div>
  );

  const RESERVATION_COL: ColumnsType<TBookingsList> = [
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.booking.table.guest_name" />
          </Text>
          <SearchTable
            dataIndex="first_name"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "user.first_name",
      render: (_, record) => (
        <Tooltip
          overlayClassName="max-w-md"
          placement="rightBottom"
          title={() => GuestInfoTooltip(record)}
        >
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "first_name" &&
              col.highLightText !== undefined &&
              col.highLightText !== ""
          ) ? (
            <Highlighter
              highlightStyle={HIGHLIGHTER_PROPS}
              searchWords={highlightSearchColumn.map(
                (col) => col.highLightText
              )}
              autoEscape
              textToHighlight={
                record.user.first_name ? record.user.first_name.toString() : ""
              }
            />
          ) : (
            record.user.first_name
          )}
        </Tooltip>
      ),
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.booking.table.room_name" />
          </Text>
          <SearchTable
            dataIndex="room_name"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "room_name",
      render: (_, record) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "room_name" &&
              col.highLightText !== undefined &&
              col.highLightText !== ""
          ) ? (
            <Highlighter
              className="text-primary-dominant hover:text-primary-dominant-light cursor-pointer"
              onClick={() => navigate(`${ROOMS}/${record.room_id}`)}
              highlightStyle={HIGHLIGHTER_PROPS}
              searchWords={highlightSearchColumn.map(
                (col) => col.highLightText
              )}
              autoEscape
              textToHighlight={
                record.room_name ? record.room_name.toString() : ""
              }
            />
          ) : (
            <Text
              className="text-primary-dominant hover:text-primary-dominant-light cursor-pointer"
              onClick={() => navigate(`${ROOMS}/${record.room_id}`)}
            >
              {record.room_name}
            </Text>
          )}
        </>
      ),
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.booking.table.check_in_date" />
        </Text>
      ),
      dataIndex: "check_in_date",
      render: (text) => <Text ellipsis={true}>{text && formatDate(text)}</Text>,
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.booking.table.check_out_date" />
        </Text>
      ),
      dataIndex: "check_out_date",
      render: (text) => <Text ellipsis={true}>{text && formatDate(text)}</Text>,
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.booking.table.total_price" />
        </Text>
      ),
      dataIndex: "total_price",
      render: (text) => <Text ellipsis={true}>{text}</Text>,
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.booking.table.payment_method.title" />
          </Text>
          <FilterTable
            arrFilters={[
              {
                text: (
                  <FormattedMessage id="pages.booking.table.payment_method.online" />
                ),
                value: ONLINE,
              },
              {
                text: (
                  <FormattedMessage id="pages.booking.table.payment_method.cash" />
                ),
                value: CASH,
              },
            ]}
            filter={filter}
            setFilter={setFilter}
            dataIndex="payment_method"
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "payment_method",
      render: (text) => (
        <Text
          ellipsis={true}
          className={
            isFilterNotEmpty &&
            highlightSearchColumn.some(
              (col) =>
                col.dataIndex === "payment_method" &&
                col.highLightText !== undefined &&
                col.highLightText !== ""
            )
              ? "column-filter"
              : ""
          }
        >
          <FormattedMessage
            id={
              text === CASH
                ? "pages.booking.table.payment_method.cash"
                : "pages.booking.table.payment_method.online"
            }
          />
        </Text>
      ),
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.booking.table.created_at" />
        </Text>
      ),
      dataIndex: "created_at",
      render: (text) => <Text ellipsis={true}>{text && formatDate(text)}</Text>,
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.rooms.table.status.title" />
          </Text>
          <FilterTable
            arrFilters={[
              {
                text: <FormattedMessage id="status.pending" />,
                value: PENDING,
              },
              {
                text: <FormattedMessage id="status.rejected" />,
                value: REJECTED,
              },
              {
                text: <FormattedMessage id="status.approved" />,
                value: APPROVED,
              },
              {
                text: <FormattedMessage id="status.updated" />,
                value: UPDATED,
              },
            ]}
            filter={filter}
            setFilter={setFilter}
            dataIndex="booking.status"
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "status",
      render: (type: TBookingsList["status"]) => {
        const { text, color } = statusMap[type] || statusMap.default;
        return (
          <Tag
            color={color}
            className={
              isFilterNotEmpty &&
              highlightSearchColumn.some(
                (col) =>
                  col.dataIndex === "booking.status" &&
                  col.highLightText !== undefined &&
                  col.highLightText !== ""
              )
                ? "column-filter"
                : ""
            }
          >
            <FormattedMessage id={text} />
          </Tag>
        );
      },
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.booking.table.action" />
        </Text>
      ),
      width: 100,
      fixed: "right",
      dataIndex: "action",
      render: (_, record) => {
        if (record.status === PENDING) {
          return (
            <Text ellipsis={true} className="cursor-pointer">
              <Popconfirm
                title={<FormattedMessage id="pages.booking.approve_title" />}
                description={
                  <FormattedMessage id="pages.booking.approve_confirm" />
                }
                icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                className=""
                onConfirm={() => {
                  mutateApproveStatus(record.id, {
                    onSuccess: () => {
                      refetch();
                      message.success(
                        intl.formatMessage({
                          id: "pages.booking.approve_success",
                        })
                      );
                    },
                  });
                }}
                cancelText={<FormattedMessage id="cancel" />}
                okText={<FormattedMessage id="approve" />}
              >
                <Tooltip
                  placement="bottom"
                  title={<FormattedMessage id="approve" />}
                >
                  <FaCheckCircle className="text-xl text-green-500 hover:text-green-400 mr-2" />
                </Tooltip>
              </Popconfirm>
              <FaTimesCircle
                className="text-xl text-primary-dominant hover:text-primary-dominant-light"
                onClick={() => {
                  setIsModalOpen(true);
                  setCancelBookingId(record.id);
                  setRejectBookingId(record.id);
                }}
              />
            </Text>
          );
        } else if (record.status === CANCELLED) {
          return (
            <>
              <IoIosDocument
                className="text-2xl text-blue-500 hover:text-blue-400 cursor-pointer"
                onClick={() => {
                  setIsModalReasonOpen(true);
                  setCancelBookingId(record.id);
                }}
              />
              <Modal
                title={
                  <FormattedMessage id="pages.booking.table.cancellation_reason" />
                }
                open={isModalReasonOpen && cancelBookingId === record.id}
                closeIcon={false}
                maskClosable={true}
                footer={null}
                onCancel={() => {
                  setIsModalReasonOpen(false);
                }}
                onOk={() => {
                  setIsModalReasonOpen(false);
                }}
              >
                {record.reason}
              </Modal>
            </>
          );
        }
      },
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-5">
        <h1>
          <FormattedMessage id="pages.booking.title" />
        </h1>
      </div>
      <Table
        loading={isLoading || !data}
        columns={RESERVATION_COL}
        dataSource={data?.data.map((booking) => ({
          ...booking,
          key: booking.id,
          total_price: formatCurrency(booking.total_price),
        }))}
        pagination={{
          showSizeChanger: false,
          onShowSizeChange: (_, size) => {
            setPageLimit(size);
          },
          current: currentPage,
          total: data?.total,
          onChange: (page) => handlePageChanges(page),
        }}
        scroll={{ x: 1500 }}
        rowClassName="customize-table-rows"
        className="custom-hidden-table"
      />
      <Modal
        title={
          <FormattedMessage id="pages.booking.table.reject_reason.title" />
        }
        open={isModalOpen}
        okText="Save"
        onCancel={() => {
          setIsModalOpen(false);
        }}
        closeIcon={false}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (rejectBookingId !== null) {
                mutateRejectStatus(
                  { id: rejectBookingId, reason: values.reason },
                  {
                    onSuccess: () => {
                      refetch();
                      message.success(
                        intl.formatMessage({
                          id: "pages.booking.reject_success",
                        })
                      );
                    },
                  }
                );
                setRejectBookingId(null);
                setIsModalOpen(false);
              }
            })
            .catch(() => {});
        }}
      >
        <Form
          form={form}
          name="reason"
          className="create-room-form mt-5 w-full"
        >
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.booking.table.reject_reason.required",
                }),
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder={intl.formatMessage({
                id: "pages.booking.table.reject_reason.placeholder",
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default Bookings;
