import { Fragment, useState } from "react";
import { Button, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { FormattedMessage, getLocale, useNavigate } from "@umijs/max";
import type { ColumnsType } from "antd/es/table";
import { RP_BRANCHES, RP_BRANCHES_CREATE } from "@/constants/link";
import { HIGHLIGHTER_PROPS, PAGE_LIMIT } from "@/constants/table";
import { useGetBranches } from "@/services/branch/services";
import { Typography } from "antd";
import { EN_LOCALE } from "@/constants/locale";
import SearchTable from "@/components/core/SearchTable";
import Highlighter from "react-highlight-words";
import { usePagination } from "@/utils/usePagination";
import { HighlightSearchColumn } from "../Bookings/Bookings";

const { Text } = Typography;

function Branches() {
  const navigate = useNavigate();
  const locale = getLocale();
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);

  const [highlightSearchColumn, setHighlightSearchColumn] = useState<
    HighlightSearchColumn[]
  >([
    {
      highLightText: "",
      dataIndex: "",
    },
  ]);
  const [filter, setFilter] = useState<{ [key: string]: any }>({});
  const isFilterNotEmpty = Object.keys(filter).length > 0;

  const { currentPage, handlePageChanges } = usePagination();

  const { data, isLoading } = useGetBranches(pageLimit, currentPage, filter);

  const onRowClick = (record: TBranch) => ({
    onClick: () => {
      navigate(`${RP_BRANCHES}/${record.id}`);
    },
    className: "cursor-pointer",
  });

  const BRANCH_COLUMNS: ColumnsType<TBranch> = [
    {
      title: (
        <Text ellipsis={true} className="text-white">
          ID
        </Text>
      ),
      dataIndex: "id",
      width: 50,
    },
    {
      title: (
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.branches.table.branch_name" />
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
        <div className="relative flex items-center justify-between">
          <Text ellipsis={true} className="text-white">
            <FormattedMessage id="pages.branches.table.address" />
          </Text>
          <SearchTable
            dataIndex="address"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "address",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "address" &&
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
            <FormattedMessage id="pages.branches.table.province_city" />
          </Text>
          <SearchTable
            dataIndex="province_city"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "province_city",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "province_city" &&
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
            <FormattedMessage id="pages.branches.table.district" />
          </Text>
          <SearchTable
            dataIndex="district"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "district",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "district" &&
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
            <FormattedMessage id="pages.branches.table.ward" />
          </Text>
          <SearchTable
            dataIndex="ward"
            filter={filter}
            setSearchText={setFilter}
            setHighlightSearchColumn={setHighlightSearchColumn}
          />
        </div>
      ),
      dataIndex: "ward",
      render: (text) => (
        <>
          {isFilterNotEmpty &&
          highlightSearchColumn.some(
            (col) =>
              col.dataIndex === "ward" &&
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
          <FormattedMessage id="pages.branches.table.reception_area" />
        </Text>
      ),
      dataIndex: "reception_area",
      render: (text: TBranch["reception_area"]) =>
        text ? (
          <Text ellipsis={true}>
            <FormattedMessage id="yes" />
          </Text>
        ) : (
          <Text ellipsis={true}>
            <FormattedMessage id="no" />
          </Text>
        ),
    },
    {
      title: (
        <Text ellipsis={true} className="text-white">
          <FormattedMessage id="pages.branches.table.type" />
        </Text>
      ),
      dataIndex: "type",
      render: (type: TBranch["type"]) => {
        if (locale === EN_LOCALE) {
          return <Text ellipsis={true}>{type.label_en}</Text>;
        } else {
          return <Text ellipsis={true}>{type?.label_vi}</Text>;
        }
      },
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-5">
        <h1>
          <FormattedMessage id="pages.branches.title" />
        </h1>
        <Button
          onClick={() => navigate(RP_BRANCHES_CREATE)}
          type="primary"
          className="flex justify-center items-center p-5 text-lg font-semibold"
        >
          <FaPlus className=" mr-1" />
          <span>
            <FormattedMessage id="pages.branches.create_btn" />
          </span>
        </Button>
      </div>

      <Table
        onRow={(record: TBranch) => onRowClick(record)}
        loading={isLoading || !data}
        columns={BRANCH_COLUMNS}
        dataSource={data?.data.map((branch) => ({
          ...branch,
          key: branch.id,
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

export default Branches;
