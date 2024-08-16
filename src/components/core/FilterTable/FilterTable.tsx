import { FaFilter } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Divider, TimePicker } from "antd";
import { FormattedMessage, useIntl } from "@umijs/max";
import { convertArrayToString, formattedTime } from "@/utils/common";
import { FORMAT } from "@/constants/table";
import "./FilterTable.less";
import { Dayjs } from "dayjs";

type Filter = {
  text: string | JSX.Element;
  value: any;
};

type FilterTableProps = {
  arrFilters?: Filter[];
  filter: { [key: string]: any };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
  dataIndex: string;
  timePicker?: boolean;
  setHighlightSearchColumn: React.Dispatch<
    React.SetStateAction<{ highLightText: string; dataIndex: string }[]>
  >;
};

const FilterTable = ({
  arrFilters,
  filter,
  setFilter,
  dataIndex,
  timePicker,
  setHighlightSearchColumn,
}: FilterTableProps) => {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const updateHighlight = (highLightText: string) => {
    setHighlightSearchColumn((prev) => {
      const filteredPrev = prev.filter(
        (item) => item.highLightText && item.dataIndex
      );
      const existingIndex = filteredPrev.findIndex(
        (item) => item.dataIndex === dataIndex
      );
      const newHighlight = { highLightText, dataIndex };

      if (existingIndex !== -1) {
        const updated = [...filteredPrev];
        updated[existingIndex] = newHighlight;
        return updated;
      } else {
        return [...filteredPrev, newHighlight];
      }
    });
  };

  const handleFilter = () => {
    const filterValue =
      dataIndex === "room_type" || dataIndex === "type_name"
        ? convertArrayToString(selectedFilters)
        : selectedFilters;

    const newFilter = { ...filter };
    if (selectedFilters.length > 0) {
      newFilter[`${dataIndex}__in`] = filterValue;
    } else {
      delete newFilter[`${dataIndex}__in`];
    }

    setFilter(newFilter);
    setIsModalVisible(false);
    updateHighlight(selectedFilters.join(", "));
  };

  const handleReset = () => {
    const newFilter = { ...filter };
    if (timePicker) {
      delete newFilter[dataIndex];
      setSelectedTime(null);
    } else if (selectedFilters.length > 0) {
      delete newFilter[`${dataIndex}__in`];
    }

    setFilter(newFilter);
    setSelectedFilters([]);
    setIsModalVisible(false);
    setHighlightSearchColumn((prev) =>
      prev.filter((item) => item.dataIndex !== dataIndex)
    );
  };

  const handleTimePickerChange = (time: Dayjs | null) => {
    if (!time) {
      handleReset();
      return;
    }

    const timeFormat = formattedTime(time);
    setFilter({
      ...filter,
      [dataIndex]: timeFormat,
    });
    setIsModalVisible(false);
    setSelectedTime(time);
    updateHighlight(timeFormat);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        filterRef.current &&
        !filterRef.current.contains(target) &&
        !target.closest(".ant-picker-dropdown")
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
      <span className="hover:bg-[#0000000f] p-1 rounded-md flex justify-center items-center translate-x-2.5 cursor-pointer">
        <FaFilter onClick={() => setIsModalVisible(!isModalVisible)} />
      </span>
      {isModalVisible &&
        (timePicker ? (
          <div className="z-20">
            <TimePicker
              format={FORMAT}
              value={selectedTime}
              placeholder={intl.formatMessage({
                id: "roomType.createRoomTypeForm.checkinTime.placeholder",
              })}
              allowClear
              className="min-w-[180px] px-2 py-1 absolute top-8 right-0 z-20"
              onChange={handleTimePickerChange}
              showNow={false}
              renderExtraFooter={() => (
                <Button
                  className="absolute bottom-1 left-2"
                  type="link"
                  onClick={handleReset}
                >
                  <FormattedMessage id="roomType.table.filter.reset" />
                </Button>
              )}
            />
          </div>
        ) : (
          <div className="min-w-[180px] max-w-full absolute top-8 right-0 bg-white rounded-md shadow-custom-1 z-20">
            <div className="p-1">
              {arrFilters?.map((filter) => (
                <Checkbox
                  key={filter.value}
                  checked={selectedFilters.includes(filter.value)}
                  className="w-full py-1 px-3 text-[#1F1D2B] rounded-[4px] font-normal text-sm leading-normal hover:bg-[#0000000a]"
                  onChange={(e) => {
                    const newSelectedFilters = e.target.checked
                      ? [...selectedFilters, filter.value]
                      : selectedFilters.filter((item) => item !== filter.value);
                    setSelectedFilters(newSelectedFilters);
                  }}
                >
                  {filter.text}
                </Checkbox>
              ))}
            </div>
            <Divider className="my-0" />
            <div className="flex justify-between items-center m-2">
              <Button
                type="link"
                onClick={handleReset}
                disabled={selectedFilters.length === 0}
              >
                <FormattedMessage id="roomType.table.filter.reset" />
              </Button>
              <Button
                className="px-2 uppercase h-6 rounded-[4px]"
                type="primary"
                onClick={handleFilter}
              >
                OK
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FilterTable;
