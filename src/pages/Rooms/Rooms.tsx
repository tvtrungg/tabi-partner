import { Fragment, useState } from "react";
import { Button, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { Access, FormattedMessage, useAccess, useNavigate } from "@umijs/max";
import { ROOMS, ROOM_CREATE } from "@/constants/link";
import { PAGE_LIMIT } from "@/constants/table";
import { useGetRooms } from "@/services/room/services";
import { usePagination } from "@/utils/usePagination";
import { formatCurrency } from "@/utils/common";
import RPRoomsColumns from "./RPRoomsColumns";
import BMRoomsColumns from "./BMRoomsColumns";
import { APPROVED, UPDATED } from "@/constants/status";

type HighlightSearchColumn = {
  highLightText: string;
  dataIndex: string;
};

function Rooms() {
  const access = useAccess();
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);

  const [highlightSearchColumn, setHighlightSearchColumn] = useState<
    HighlightSearchColumn[]
  >([
    {
      highLightText: "",
      dataIndex: "",
    },
  ]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<{ [key: string]: any }>({});
  const isFilterNotEmpty = Object.keys(filter).length > 0;

  const { currentPage, handlePageChanges } = usePagination();

  const { data, isLoading } = useGetRooms(
    pageLimit,
    currentPage,
    access.isBM ? { status__in: [APPROVED, UPDATED], ...filter } : filter
  );

  const onRowClick = (record: TRoomList) => ({
    onClick: () => {
      navigate(`${ROOMS}/${record.id}`);
    },
    className: "cursor-pointer",
  });

  const tableColumns = access.isRP
    ? RPRoomsColumns({
        filter,
        setFilter,
        highlightSearchColumn,
        setHighlightSearchColumn,
        isFilterNotEmpty,
      })
    : BMRoomsColumns({
        filter,
        setFilter,
        highlightSearchColumn,
        setHighlightSearchColumn,
        isFilterNotEmpty,
      });

  if (access.isHST) {
    tableColumns.pop();
  }

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-5">
        <h1>
          <FormattedMessage id="pages.rooms.title" />
        </h1>
        <Access accessible={access.isBM || access.isHST}>
          <Button
            onClick={() => navigate(ROOM_CREATE)}
            type="primary"
            className="flex justify-center items-center p-5 text-lg font-semibold"
          >
            <FaPlus className="mr-1" />
            <span>
              <FormattedMessage id="pages.rooms.create_btn" />
            </span>
          </Button>
        </Access>
      </div>

      <Table
        onRow={(record: TRoomList) => onRowClick(record)}
        loading={isLoading || !data}
        columns={tableColumns}
        dataSource={data?.data.map((room) => ({
          ...room,
          key: room.id,
          max_price: formatCurrency(room.max_price),
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
        scroll={{ x: 800 }}
      />
    </Fragment>
  );
}

export default Rooms;
