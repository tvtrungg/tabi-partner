import { FormattedMessage } from "@umijs/max";
import { useState } from "react";
import { Popconfirm, Typography, message } from "antd";
import type { TableColumnsType } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { MdDeleteOutline } from "react-icons/md";

import {
  setRoomFacilitiesEditDialogState,
  setRoomFacilitiesEditDialogForm,
} from "@/hooks/useRoomFacilities";
import { getTimeHourAndMinute } from "@/utils/common";
import {
  TRoomTypeLinkUnlinkRequest,
  TRoomTypeOfBranch,
} from "@/services/roomType/typing";
import {
  UseMutateFunction,
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import dayjs from "dayjs";
import FilterTable from "@/components/core/FilterTable";
import { HighlightSearchColumn } from "../Bookings/Bookings";
import { HIGHLIGHTER_PROPS } from "@/constants/table";
import SearchTable from "@/components/core/SearchTable";
import Highlighter from "react-highlight-words";

const { Text } = Typography;

export const ColumnProperties = (
  intl: any,
  isFilterNotEmpty: boolean,
  filter: { [key: string]: any },
  setFilter: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >,
  branch_id: number,
  mutateLinkUnlinkRoomTypeFromBranch: UseMutateFunction<
    TAuthResponse,
    TErrorResponse,
    TRoomTypeLinkUnlinkRequest,
    unknown
  >,
  refetchRoomTypeOfBranch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<TListResponse<TRoomTypeOfBranch>, TErrorResponse>
  >
): TableColumnsType<TRoomTypeBM> => {
  const [highlightSearchColumn, setHighlightSearchColumn] = useState<
    HighlightSearchColumn[]
  >([
    {
      highLightText: "",
      dataIndex: "",
    },
  ]);

  const columns: TableColumnsType<TRoomTypeBM> = [
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="roomType.table.columnLabels.roomType" />
          </Text>
          <SearchTable
            dataIndex="type_name"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "type_name",
      key: "type_name",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "type_name" &&
              col.highLightText !== undefined &&
              col.highLightText !== ""
          ) ? (
            <Highlighter
              highlightStyle={HIGHLIGHTER_PROPS}
              searchWords={highlightSearchColumn.map(
                (col) => col.highLightText
              )}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
            />
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="roomType.table.columnLabels.checkinTime" />
          </Text>
          <FilterTable
            filter={filter}
            setHighlightSearchColumn={setHighlightSearchColumn}
            setFilter={setFilter}
            dataIndex="check_in_time"
            timePicker={true}
          />
        </div>
      ),
      dataIndex: "check_in_time",
      key: "check_in_time",
      render: (timeString) => (
        <Text
          ellipsis={true}
          className={
            isFilterNotEmpty &&
            highlightSearchColumn.some(
              (col) =>
                col.dataIndex === "check_in_time" &&
                col.highLightText !== undefined &&
                col.highLightText !== ""
            )
              ? "column-filter"
              : ""
          }
        >
          {getTimeHourAndMinute(timeString)}
        </Text>
      ),
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="roomType.table.columnLabels.checkoutTime" />
          </Text>
          <FilterTable
            filter={filter}
            setHighlightSearchColumn={setHighlightSearchColumn}
            setFilter={setFilter}
            dataIndex="check_out_time"
            timePicker={true}
          />
        </div>
      ),
      dataIndex: "check_out_time",
      key: "check_out_time",
      render: (timeString) => (
        <Text
          ellipsis={true}
          className={
            isFilterNotEmpty &&
            highlightSearchColumn.some(
              (col) =>
                col.dataIndex === "check_out_time" &&
                col.highLightText !== undefined &&
                col.highLightText !== ""
            )
              ? "column-filter"
              : ""
          }
        >
          {getTimeHourAndMinute(timeString)}
        </Text>
      ),
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="roomType.table.columnLabels.includeBreakfast" />
          </Text>
          <FilterTable
            arrFilters={[
              {
                text: (
                  <FormattedMessage id="roomType.table.includeBreakfastValue.included" />
                ),
                value: true,
              },
              {
                text: (
                  <FormattedMessage id="roomType.table.includeBreakfastValue.notIncluded" />
                ),
                value: false,
              },
            ]}
            filter={filter}
            setFilter={setFilter}
            dataIndex="include_breakfast"
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "include_breakfast",
      key: "include_breakfast",

      render: (value) => {
        if (value) {
          return (
            <Text
              ellipsis={true}
              className={
                isFilterNotEmpty &&
                highlightSearchColumn.some(
                  (col) =>
                    col.dataIndex === "include_breakfast" &&
                    col.highLightText !== undefined &&
                    col.highLightText !== ""
                )
                  ? "column-filter"
                  : ""
              }
            >
              <FormattedMessage id="roomType.table.includeBreakfastValue.included" />{" "}
              <CheckCircleOutlined className="text-color-success" />
            </Text>
          );
        } else {
          return (
            <Text
              ellipsis={true}
              className={
                isFilterNotEmpty &&
                highlightSearchColumn.some(
                  (col) =>
                    col.dataIndex === "include_breakfast" &&
                    col.highLightText !== undefined &&
                    col.highLightText !== ""
                )
                  ? "column-filter"
                  : ""
              }
            >
              <FormattedMessage id="roomType.table.includeBreakfastValue.notIncluded" />{" "}
              <CloseCircleOutlined className="text-color-error" />
            </Text>
          );
        }
      },
    },
    {
      title: <FormattedMessage id="roomType.table.columnLabels.action" />,
      key: "operation",
      fixed: "right",
      width: 150,
      render: (value: TRoomTypeOfBranch) => {
        const checkInTime = new Date(value.check_in_time);
        checkInTime.setHours(checkInTime.getHours());

        const checkOutTime = new Date(value.check_out_time);
        checkOutTime.setHours(checkOutTime.getHours());

        return (
          <div className="flex flex-row items-center gap-4">
            <div className="icon-wrapper">
              <EditOutlined
                style={{ fontSize: "16px" }}
                onClick={() => {
                  const room_facilities = value.facilities.map(
                    (facility) => facility.id
                  );
                  setRoomFacilitiesEditDialogState(true);
                  setRoomFacilitiesEditDialogForm({
                    ...value,
                    check_in_time: dayjs(checkInTime.toString()),
                    check_out_time: dayjs(checkOutTime.toString()),
                    branch_id,
                    room_facilities,
                  });
                }}
              />
            </div>
            <Popconfirm
              title={<FormattedMessage id="roomType.deleteRoomType.title" />}
              description={
                <FormattedMessage id="roomType.deleteRoomType.description" />
              }
              onConfirm={() => {
                mutateLinkUnlinkRoomTypeFromBranch(
                  {
                    room_type_id: value.id,
                    branch_id: branch_id,
                    link_status: false,
                  },
                  {
                    onSuccess: () => {
                      message.success(
                        intl.formatMessage({
                          id: "roomType.deleteRoomType.messageSuccess",
                        })
                      );
                      refetchRoomTypeOfBranch();
                    },
                  }
                );
              }}
              okText={
                <FormattedMessage id="roomType.deleteRoomType.buttonOk" />
              }
              cancelText={
                <FormattedMessage id="roomType.deleteRoomType.buttonCancel" />
              }
            >
              <div className="icon-wrapper">
                <MdDeleteOutline className="text-xl" />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return columns;
};
