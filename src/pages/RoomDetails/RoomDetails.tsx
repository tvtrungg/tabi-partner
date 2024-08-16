import { FormattedMessage, getLocale, useAccess, useParams } from "@umijs/max";
import RoomInfo from "./RoomInfo";
import _get from "lodash/get";
import { useGetRoomById } from "@/services/room/services";
import { Breadcrumb, Col, Row, Spin } from "antd";
import { ROOMS } from "@/constants/link";
import { useTransparentBackground } from "@/hooks/useTransparentBackground";
import RoomType from "./RoomType";
import PriceDetails from "./PriceDetails";
import ImageDetails from "./ImageDetails";
import { VI_LOCALE } from "@/constants/locale";
import RoomSchedule from "./RoomSchedule";
import { convertPercentageValue } from "@/services/room/utils";

function RoomDetails() {
  useTransparentBackground();
  const locale = getLocale();
  const isVN = locale === VI_LOCALE;
  const access = useAccess();
  const params = useParams();
  let id = Number(_get(params, "id") || 0);
  let dataConvert: TRoomDetails = {} as TRoomDetails;

  const { data, isLoading, refetch } = useGetRoomById(id) as {
    data: TRoomDetails;
    isLoading: boolean;
    refetch: () => void;
  };

  if (data) {
    dataConvert = convertPercentageValue(data);
  }

  if (isLoading)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );

  return (
    <>
      <Breadcrumb
        items={[
          {
            href: ROOMS,
            title: (
              <FormattedMessage id="pages.room_details.bread_crumb.rooms_management" />
            ),
          },
          {
            title: (
              <FormattedMessage id="pages.room_details.bread_crumb.details" />
            ),
          },
        ]}
        className="mb-5"
      />
      <h1>
        <FormattedMessage id="pages.room_details.title" />
      </h1>

      <Row gutter={24} className="flex-nowrap items-stretch -mx-2">
        <Col className="max-w-[400px]">
          <div className="box-custom flex flex-col gap-6 h-full">
            <RoomInfo
              id={Number(id)}
              data={dataConvert}
              locale={locale}
              access={access}
              refetch={refetch}
            />
            <RoomSchedule id={id} total_rooms={dataConvert.quantity}/>
          </div>
        </Col>
        <Col className="flex flex-col gap-5 max-w-[calc(100%-400px)] grow w-full">
          <div className="flex flex-col gap-5">
            <RoomType
              id={Number(dataConvert.id)}
              data={dataConvert.room_type}
              isVN={isVN}
              access={access}
              refetch={refetch}
            />
            <PriceDetails
              id={Number(dataConvert.id)}
              data={dataConvert}
              access={access}
              refetch={refetch}
            />
          </div>

          <div className="box-custom h-full">
            <ImageDetails
              data={dataConvert}
              refetch={refetch}
              access={access}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default RoomDetails;
