import { FormattedMessage } from "@umijs/max";
import { Calendar, ConfigProvider, List, Popover, Row, Spin } from "antd";
import { Dayjs } from "dayjs";
import "./RoomSchedule.less";
import { useGetBookingListById } from "@/services/room/services";
import _get from "lodash/get";

type TRoomScheduleProps = {
  id: number;
  total_rooms: number;
};

function RoomSchedule({ id, total_rooms }: TRoomScheduleProps) {
  const { data, isLoading } = useGetBookingListById(id) as {
    data: TListResponse<TBookingsList>;
    isLoading: boolean;
  };

  const listBookings = _get(data, "data", [] as TBookingsList[]);

  if (isLoading)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );

  const dateFullCellRender = (value: Dayjs) => {
    const selectedDate = value.startOf("day").valueOf();

    const bookingsOnSelectedDate = listBookings.filter((booking) => {
      const checkIn = new Date(booking.check_in_date).setHours(0, 0, 0, 0);
      const checkOut = new Date(booking.check_out_date).setHours(0, 0, 0, 0);
      return selectedDate >= checkIn && selectedDate <= checkOut;
    });
    const totalBookedRooms = bookingsOnSelectedDate.reduce(
      (acc, booking) => acc + booking.quantity,
      0
    );

    const availableRooms = total_rooms - totalBookedRooms;
    const content = (
      <List
        className="list-custom-schedule"
        itemLayout="horizontal"
        header={
          <div className="flex flex-col gap-2">
            <span className="font-semibold">
              <FormattedMessage id="pages.booking.tooltip.unavailable_rooms" />:
            </span>
            <span className="font-semibold">
              <FormattedMessage id="pages.booking.tooltip.available_rooms" />:
            </span>
          </div>
        }
        dataSource={bookingsOnSelectedDate}
        renderItem={(_, index) => {
          if (index === 0) {
            return (
              <div className="flex justify-center gap-5 my-3">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">{totalBookedRooms}</span>
                  <span className="font-normal">{availableRooms}</span>
                </div>
              </div>
            );
          }
        }}
      />
    );
    const wrapperClass =
      availableRooms === 0
        ? "bg-primary-dominant-light"
        : "bg-primary-accent-light";
    if (bookingsOnSelectedDate.length > 0) {
      return (
        <Popover className="popover-custom-schedule" content={content}>
          <div
            className={`ant-picker-cell-inner wrapper-booked ${wrapperClass} w-[58px]`}
          >
            {bookingsOnSelectedDate.map((booking, index) =>
              index === 0 ? (
                <span key={booking.id} className="date-booked">
                  {value.date()}
                </span>
              ) : (
                <div key={booking.id} className="date-"></div>
              )
            )}
          </div>
        </Popover>
      );
    }
    return <div className="ant-picker-cell-inner">{value.date()}</div>;
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-0">
        <h1 className="text-lg font-bold">
          <FormattedMessage id="pages.room_details.room_schedule.title" />
        </h1>
      </div>
      <ConfigProvider
        theme={{
          token: {
            controlItemBgHover: "transparent",
          },
        }}
      >
        <Calendar
          mode="month"
          fullscreen={false}
          fullCellRender={dateFullCellRender}
          className="custom-calendar"
        />
      </ConfigProvider>
    </div>
  );
}

export default RoomSchedule;
