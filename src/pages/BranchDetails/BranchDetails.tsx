import { RP_BRANCHES } from "@/constants/link";
import {
  useGetBranchBookingAnalysis,
  useGetBranchById,
  useGetBranchRevenueAnalysis,
} from "@/services/branch/services";
import {
  Access,
  FormattedMessage,
  getLocale,
  useAccess,
  useModel,
  useParams,
} from "@umijs/max";
import { Breadcrumb, Col, Row, Spin } from "antd";
import "./BranchDetails.less";

import _get from "lodash/get";
import Facilities from "./Facilities";
import BranchInfo from "./BranchInfo";
import { useTransparentBackground } from "@/hooks/useTransparentBackground";
import { BRANCH_MANAGER, HOST } from "@/constants/auth";
import BranchPolicy from "./BranchPolicy";
import ChartAnalysis from "@/components/common/ChartAnalysis";
import { useState } from "react";
import Ratings from "./Ratings";

function BranchDetails() {
  useTransparentBackground();
  const currentYear = new Date().getFullYear();
  const [yearRevenue, setYearRevenue] = useState<string>(String(currentYear));
  const [yearBooking, setYearBooking] = useState<string>(String(currentYear));

  const { initialState } = useModel("@@initialState");
  const role = _get(initialState, "role");
  const place_id = _get(initialState, "place_id", 0);
  const locale = getLocale();
  const access = useAccess();
  const params = useParams();
  let id =
    role === BRANCH_MANAGER || role === HOST
      ? place_id
      : Number(_get(params, "id") || 0);
  const { data, isLoading, refetch } = useGetBranchById(id) as {
    data: TBranchDetails;
    isLoading: boolean;
    refetch: () => void;
  };

  const { data: revenueDataAnalysis, isLoading: revenueLoading } =
    useGetBranchRevenueAnalysis(yearRevenue);
  const { data: bookingDataAnalysis, isLoading: bookingLoading } =
    useGetBranchBookingAnalysis(yearBooking);

  const revenueMap = (revenueDataAnalysis || []).reduce((acc, item) => {
    if (acc[String(item.month)] > 0) {
      return {
        ...acc,
        [String(item.month)]: acc[String(item.month)] + item.revenue,
      };
    }

    return { ...acc, [String(item.month)]: item.revenue };
  }, {} as Record<string, number>);

  const revenuesFormat = Object.keys(revenueMap as Record<string, number>).map(
    (key) => {
      return { month: Number(key), revenue: revenueMap?.[key] as number };
    }
  );

  if (isLoading)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  return (
    <>
      <Access accessible={access.isRP || access.isHST}>
        <Breadcrumb
          items={[
            {
              href: RP_BRANCHES,
              title: (
                <FormattedMessage id="pages.branch_details.bread_crumb.branches_management" />
              ),
            },
            {
              title: (
                <FormattedMessage id="pages.branch_details.bread_crumb.details" />
              ),
            },
          ]}
          className="mb-5"
        />
      </Access>
      <h1>
        <FormattedMessage id="pages.branch_details.title" />
      </h1>

      <Row gutter={24} className="flex-nowrap items-stretch -mx-2">
        <Col className="max-w-[400px]">
          <div className="box-custom flex flex-col gap-1 h-full">
            <BranchInfo
              id={Number(id)}
              data={data}
              locale={locale}
              access={access}
              refetch={() => {
                refetch();
              }}
            />
          </div>
        </Col>
        <Col className="flex flex-col gap-5 max-w-[calc(100%-400px)] grow w-full">
          <div className="box-custom">
            <Facilities data={data} locale={locale} />
          </div>

          <div className="box-custom h-full">
            <BranchPolicy
              id={Number(id)}
              data={data}
              access={access}
              locale={locale}
              refetch={refetch}
            />
          </div>
          <div className="flex flex-col justify-between box-custom">
            <Ratings data={data} />
          </div>
        </Col>
      </Row>
      <div className="flex justify-between box-custom gap-20 my-5">
        <ChartAnalysis
          data={revenuesFormat}
          isLoading={revenueLoading}
          title="pages.branch_details.analysis.title_revenue"
          type="revenue"
          year={yearRevenue}
          setYear={setYearRevenue}
        />
        <ChartAnalysis
          data={bookingDataAnalysis}
          isLoading={bookingLoading}
          title="pages.branch_details.analysis.title_booking"
          type="booking"
          year={yearBooking}
          setYear={setYearBooking}
        />
      </div>
    </>
  );
}

export default BranchDetails;
