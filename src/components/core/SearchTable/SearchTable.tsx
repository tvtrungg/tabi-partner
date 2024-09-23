import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Space } from "antd";
import { FormattedMessage } from "@umijs/max";
import { IoMdSearch } from "react-icons/io";
import { formatCurrency, removeComma } from "@/utils/common";

type SearchTableProps = {
  dataIndex: string;
  filter: { [key: string]: any };
  setSearchText: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setHighlightSearchColumn: React.Dispatch<
    React.SetStateAction<{ highLightText: string; dataIndex: string }[]>
  >;
};

const SearchTable = ({
  dataIndex,
  filter,
  setSearchText,
  setHighlightSearchColumn,
}: SearchTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const searchInput = useRef<InputRef>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const updateHighlight = (highLightText: string) => {
    setHighlightSearchColumn((prev) => {
      const filteredPrev = prev.filter(
        (item) => item.dataIndex && item.highLightText
      );
      const existingIndex = filteredPrev.findIndex(
        (item) => item.dataIndex === dataIndex
      );
      const newHighlight = { highLightText, dataIndex };

      if (existingIndex !== -1) {
        filteredPrev[existingIndex] = newHighlight;
        return filteredPrev;
      } else {
        return [...filteredPrev, newHighlight];
      }
    });
  };

  const removeHighlight = () => {
    setHighlightSearchColumn((prev) =>
      prev.filter((item) => item.dataIndex !== dataIndex)
    );
  };

  const handleSearch = () => {
    const newFilter = { ...filter };

    if (selectedKeys.length > 0) {
      newFilter[dataIndex] = selectedKeys[0];
    } else {
      delete newFilter[dataIndex];
    }

    setSearchText(newFilter);
    updateHighlight(selectedKeys[0]);
    setIsModalVisible(false);
  };

  const handleReset = () => {
    const newFilter = { ...filter };
    delete newFilter[dataIndex];

    setSelectedKeys([]);
    setSearchText(newFilter);
    removeHighlight();
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible && searchInput.current) {
      searchInput.current.focus();
    }
  }, [isModalVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef}>
      <span className="hover:bg-[#0000000f] text-lg p-1 rounded-md flex justify-center items-center translate-x-2.5 cursor-pointer">
        <IoMdSearch onClick={() => setIsModalVisible(!isModalVisible)} />
      </span>
      {isModalVisible && (
        <div className="w-[170px] absolute top-8 -right-4 bg-white rounded-md shadow-custom-1 z-20">
          <div className="p-2">
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={formatCurrency(removeComma(selectedKeys[0]))}
              onChange={(e) => {
                const value = removeComma(e.target.value);
                setSelectedKeys(value ? [value] : []);
              }}
              onPressEnter={handleSearch}
              className="mb-2 block ps-2 p-1"
            />
            <Space>
              <Button
                type="primary"
                onClick={handleSearch}
                size="small"
                className="w-20 flex flex-row justify-center items-center"
              >
                <FormattedMessage id="roomType.table.filter.search" />
              </Button>
              <Button
                onClick={handleReset}
                size="small"
                className="w-16 flex flex-row justify-center items-center"
              >
                <FormattedMessage id="roomType.table.filter.reset" />
              </Button>
            </Space>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTable;
