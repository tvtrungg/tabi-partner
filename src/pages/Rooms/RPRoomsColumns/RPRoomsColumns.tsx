import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import { FormattedMessage } from "@umijs/max";
import SearchTable from "@/components/core/SearchTable";
import Highlighter from "react-highlight-words";
import { HIGHLIGHTER_PROPS } from "@/constants/table";
import { PiCircleNotchBold } from "react-icons/pi";
import { HighlightSearchColumn } from "@/pages/Bookings/Bookings";

const { Text } = Typography;

const statusMap: { [key: string]: { text: string; color: string } } = {
  PEN: { text: "status.pending", color: "blue-600" },
  APP: { text: "status.approved", color: "green-400" },
  REJ: { text: "status.rejected", color: "primary-dominant" },
  default: { text: "status.updated", color: "yellow-400" },
};

const RPRoomsColumns = (props: {
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

  return [
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.rooms.table.branch_name" />
          </Text>

          <SearchTable
            dataIndex="branch_name"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "branch_name",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "branch_name" &&
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
          <FormattedMessage id="pages.rooms.table.branch_manager_name" />
        </Text>
      ),
      dataIndex: "branch_manager_name",
      render: (text) => <Text ellipsis={true}>{text}</Text>,
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.rooms.table.room_type" />
        </Text>
      ),
      dataIndex: "room_type",
      render: (text) => <Text ellipsis={true}>{text}</Text>,
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
          <FormattedMessage id="pages.rooms.table.max_price" />
        </Text>
      ),
      dataIndex: "max_price",
      render: (text) => <Text ellipsis={true}>{text}</Text>,
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.rooms.table.status.title" />
        </Text>
      ),
      dataIndex: "status",
      render: (type: TRoomList["status"]) => {
        const { text, color } = statusMap[type] || statusMap.default;
        return (
          <div className={`flex items-center gap-2 text-sm`}>
            <PiCircleNotchBold className={`text-${color}`} />
            <FormattedMessage id={text} />
          </div>
        );
      },
    },
  ];
};

export default RPRoomsColumns;
