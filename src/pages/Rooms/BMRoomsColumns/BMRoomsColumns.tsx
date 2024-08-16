import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";

import { FormattedMessage } from "@umijs/max";
import SearchTable from "@/components/core/SearchTable";
import FilterTable from "@/components/core/FilterTable";
import Highlighter from "react-highlight-words";
import { HIGHLIGHTER_PROPS } from "@/constants/table";
import { PiCircleNotchBold } from "react-icons/pi";
import { useGetRoomType } from "@/services/roomType/services";
import { APPROVED } from "@/constants/status";
import { HighlightSearchColumn } from "@/pages/Bookings/Bookings";
import { formatCurrency } from "@/utils/common";

const { Text } = Typography;

const BMRoomsColumns = (props: {
  filter: { [key: string]: any };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
  highlightSearchColumn: HighlightSearchColumn[];
  setHighlightSearchColumn: React.Dispatch<
    React.SetStateAction<HighlightSearchColumn[]>
  >;
  isFilterNotEmpty: boolean;
}): ColumnsType<TRoomList> => {
  const {
    filter,
    setFilter,
    highlightSearchColumn,
    setHighlightSearchColumn,
    isFilterNotEmpty,
  } = props;

  const { data: dataRoomTypes } = useGetRoomType();

  return [
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.rooms.table.room_type" />
          </Text>
          <FilterTable
            arrFilters={
              dataRoomTypes?.data?.map((roomType) => ({
                value: roomType.type_name,
                text: roomType.type_name,
              })) || []
            }
            filter={filter}
            setFilter={setFilter}
            dataIndex="room_type"
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "room_type",
      render: (text) => (
        <Text
          ellipsis={true}
          className={
            isFilterNotEmpty &&
            highlightSearchColumn.some(
              (col) =>
                col.dataIndex === "room_type" &&
                col.highLightText !== undefined &&
                col.highLightText !== ""
            )
              ? "column-filter"
              : ""
          }
        >
          {text}
        </Text>
      ),
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.rooms.table.room_name" />
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
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "room_name" &&
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
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.rooms.table.quantity" />
        </Text>
      ),
      dataIndex: "quantity",
      render: (text) => <Text ellipsis={true}>{text}</Text>,
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.rooms.table.max_price" />
          </Text>
          <SearchTable
            dataIndex="max_price"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "max_price",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "max_price" &&
              col.highLightText !== undefined &&
              col.highLightText !== ""
          ) ? (
            <Highlighter
              highlightStyle={HIGHLIGHTER_PROPS}
              searchWords={highlightSearchColumn.map((col) =>
                formatCurrency(col.highLightText)
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
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.rooms.table.status.title" />
        </Text>
      ),
      dataIndex: "status",
      render: (type: TRoomList["status"]) => {
        switch (type) {
          case APPROVED:
            return (
              <div className="flex items-center gap-2">
                <PiCircleNotchBold className="text-sm text-green-400" />
                <FormattedMessage id="status.approved" />
              </div>
            );
          default:
            return (
              <div className="flex items-center gap-2">
                <PiCircleNotchBold className="text-base text-yellow-400" />
                <FormattedMessage id="status.updated" />
              </div>
            );
        }
      },
    },
  ];
};

export default BMRoomsColumns;
