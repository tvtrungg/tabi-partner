import { removeComma } from "@/utils/common";

export const formKeys = [
  "room_type_id",
  "bed_type_id",
  "room_name",
  "max_occupancy",
  "width",
  "length",
  "quantity",
  "max_price",
  "online_method",
  "on_cash_method",
  "normal_day",
  "holiday",
  "weekend",
  "reservation_reduction",
];

export const formPriceDetailsKeys = [
  "max_price",
  "online_method",
  "on_cash_method",
  "normal_day",
  "holiday",
  "weekend",
  "reservation_reduction",
];

export const formFactureKeys: Array<keyof TFactureReduction> = [
  "online_method",
  "on_cash_method",
  "normal_day",
  "holiday",
  "weekend",
];

const getReservationReductionRequest = (
  values: TReservationReduction[]
): TReservationReductionRequest[] => {
  return values.map((value) => {
    const { quantity, time_unit, reduction } = value;
    return {
      quantity: Number(quantity),
      time_unit,
      reduction: Number(reduction) / 100,
    };
  });
};

export const getCreationRoomRequest = (values: TCreationRoom): TRoomRequest => {
  const {
    room_type_id,
    bed_type_id,
    room_name,
    max_occupancy,
    width,
    length,
    quantity,
    max_price,
    online_method,
    on_cash_method,
    normal_day,
    holiday,
    weekend,
    reservation_reduction,
  } = values;

  return {
    room_type_id: Number(room_type_id),
    bed_type_id: Number(bed_type_id),
    room_name,
    max_occupancy: Number(max_occupancy),
    width: Number(width),
    length: Number(length),
    quantity: Number(quantity),
    max_price: Number(removeComma(max_price)),
    online_method: Number(online_method) / 100,
    on_cash_method: Number(on_cash_method) / 100,
    normal_day: Number(normal_day) / 100,
    holiday: Number(holiday) / 100,
    weekend: Number(weekend) / 100,
    reservation_reduction: getReservationReductionRequest(
      reservation_reduction
    ),
  };
};

export const getUpdatePriceDetails = (
  values: TUpdatePrice
): TUpdatePriceDetails => {
  const {
    max_price,
    online_method,
    on_cash_method,
    normal_day,
    holiday,
    weekend,
    reservation_reduction,
  } = values;
  return {
    max_price: Number(removeComma(max_price)),
    online_method: Number(online_method) / 100,
    on_cash_method: Number(on_cash_method) / 100,
    normal_day: Number(normal_day) / 100,
    holiday: Number(holiday) / 100,
    weekend: Number(weekend) / 100,
    reservation_reduction: getReservationReductionRequest(
      reservation_reduction
    ),
  };
};

export const convertPercentageValue = (data: TRoomDetails) => {
  formFactureKeys.forEach((key) => {
    data.facture_reduction[key] = String(
      (Number(data.facture_reduction[key]) * 100).toFixed(0)
    );
  });
  data.reservation_reductions = data.reservation_reductions.map((item) => ({
    ...item,
    reduction: String((Number(item.reduction) * 100).toFixed(0)),
  }));
  return data;
};

export const getInfoCompanyRequest = (values: TCompany) => {
  const company = { ...values };
  company.representative = {
    ...values.representative,
  };
  return company;
};
