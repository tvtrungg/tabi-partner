import { FormattedMessage, getLocale, useIntl } from "@umijs/max";
import { Line, Column } from "@ant-design/plots";
import { formatCurrency } from "@/utils/common";
import { DatePicker } from "antd";
import dayjs from "dayjs";

type TChartAnalysis = {
  data: any;
  isLoading: boolean;
  title: string;
  type: "revenue" | "booking";
  year: string;
  setYear: (year: string) => void;
};

function ChartAnalysis({
  data,
  isLoading,
  title,
  type,
  year,
  setYear,
}: TChartAnalysis) {
  const intl = useIntl();
  const locale = getLocale();
  const isVN = locale === "vi-VN";

  const isRevenue = type === "revenue";
  const key_1 = isVN ? "tháng" : "month";
  const key_2 = isRevenue
    ? isVN
      ? "doanh thu"
      : "revenue"
    : isVN
    ? "số lượng"
    : "quantity";

  const formattedData = Array.isArray(data)
    ? data
        .sort((a, b) => a.month - b.month)
        .map((item: any) => ({
          [key_1]: item.month,
          [key_2]: item[isRevenue ? "revenue" : "quantity"],
        }))
    : [];

  const hasData = formattedData.length > 0;
  const CONFIG_CHART = {
    data: hasData ? formattedData : [{ [key_1]: "", [key_2]: 0 }],
    xField: key_1,
    yField: key_2,
    colorField: "#FF7B8F",
    tooltip: { channel: "y", valueFormatter: "," },
    style: isRevenue
      ? { lineWidth: 2 }
      : { radiusTopLeft: 10, radiusTopRight: 10 },
    axis: {
      x: {
        title: intl.formatMessage({
          id: isRevenue
            ? "pages.company.analysis.axis_x_revenue"
            : "pages.company.analysis.axis_x_booking",
        }),
        tickInterval: 1,
        // chỉ hiện số nguyên
        labelFormatter: (v: any) => {
          if (!Number.isInteger(v)) return "";
          return v;
        },
      },
      y: {
        title: intl.formatMessage({
          id: isRevenue
            ? "pages.company.analysis.axis_y_revenue"
            : "pages.company.analysis.axis_y_booking",
        }),
        labelFormatter: ",",
      },
    },
  };

  return (
    <div className="w-full">
      <h1 className="text-xl mb-5 font-bold">
        <FormattedMessage id={title} />
      </h1>
      <DatePicker
        className="float-right mb-2 z-20 p-1 px-2"
        defaultValue={dayjs(year)}
        onChange={(date) => {
          if (date) {
            setYear(date.format("YYYY"));
          }
        }}
        picker="year"
      />
      <div className="w-full">
        {isRevenue ? (
          <Line
            {...CONFIG_CHART}
            point={{
              shapeField: "square",
              sizeField: 4,
            }}
            loading={isLoading}
          />
        ) : (
          <Column
            {...CONFIG_CHART}
            loading={isLoading}
            label={{
              text: (d: any) => formatCurrency(d[key_2]),
              textBaseline: "bottom",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ChartAnalysis;
