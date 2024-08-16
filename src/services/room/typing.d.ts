type TRoomRequest = {
  room_type_id: number;
  bed_type_id: number;
  room_name: string;
  max_occupancy: number;
  width: number;
  length: number;
  quantity: number;
  max_price: number;
  online_method: number;
  on_cash_method: number;
  normal_day: number;
  holiday: number;
  weekend: number;
  reservation_reduction: TReservationReductionRequest[];
};

type TCreationRoom = {
  room_type_id: number;
  bed_type_id: number;
  room_name: string;
  max_occupancy: number;
  width: number;
  length: number;
  quantity: number;
  max_price: string;
  online_method: string;
  on_cash_method: string;
  normal_day: string;
  holiday: string;
  weekend: string;
  reservation_reduction: TReservationReduction[];
};

type TRoomResponse = {
  id: number;
  TRoomRequest;
};

type TCancellation = {
  quantity: string;
  time_unit: string;
  cancellation: string;
};

type TUpdatePrice = {
  max_price: string;
  online_method: string;
  on_cash_method: string;
  normal_day: string;
  holiday: string;
  weekend: string;
  reservation_reduction: TReservationReduction[];
};

type TUpdatePriceDetails = {
  max_price: number;
  online_method: number;
  on_cash_method: number;
  normal_day: number;
  holiday: number;
  weekend: number;
  reservation_reduction: TReservationReductionRequest[];
};

type TReservationReduction = {
  quantity: string;
  time_unit: string;
  reduction: string;
};

type TReservationReductionRequest = {
  quantity: number;
  time_unit: string;
  reduction: number;
};

type TRoomList = {
  id: number;
  room_type: string;
  room_name: string;
  status: string;
  quantity: string;
  max_price: string;
  branch_name: string;
  branch_manager_name: string;
};

type TFactureReduction = {
  online_method: string;
  on_cash_method: string;
  normal_day: string;
  holiday: string;
  weekend: string;
};

type TFactureReductionOfRoom = {
  id: number;
  room_id: number;
  online_method: string;
  on_cash_method: string;
  normal_day: string;
  holiday: string;
  weekend: string;
};

type TBedType = {
  id: number;
  class: string;
  label_en: string;
  label_vi: string;
  desc_en: string;
  desc_vi: string;
  order: number;
};

type TRoomDetails = {
  id: number;
  room_name: string;
  max_occupancy: number;
  available: boolean;
  status: string;
  width: number;
  length: number;
  max_price: number;
  quantity: number;
  check_in_date: string;
  check_out_date: string;
  bed_type: TBedType;
  facture_reduction: TFactureReductionOfRoom;
  reservation_reductions: TReservationReduction[];
  room_type: TRoomTypeBM;
};

type TRoomSchedule = {
  id: number;
  room_id: number;
  room_name: string;
  booking_list: TBookingsList[];
};
