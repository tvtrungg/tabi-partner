import dayjs from "dayjs";

type TRoomTypeOfBranch = {
  branch_id: number;
  id: number;
  type_name: string;
  check_in_time: string;
  check_out_time: string;
  include_breakfast: boolean;
  facilities: TFacilityModel[];
};

type TRoomTypeAddRequest = {
  branch_id: number;
  type_name: string;
  check_in_time: string;
  check_out_time: string;
  include_breakfast: boolean;
  room_facilities: readonly number[];
};

type TRoomTypeUpdateRequest = {
  id: number;
  branch_id: number;
  type_name: string;
  check_in_time: dayjs;
  check_out_time: dayjs;
  include_breakfast: boolean;
};

type TRoomTypeUpdateFacilitiesRequest = {
  id: number;
  branch_id: number | null;
  type_name: string;
  check_in_time: string | dayjs;
  check_out_time: string | dayjs;
  include_breakfast: boolean;
  room_facilities: readonly number[];
};

type TRoomTypeLinkUnlinkRequest = {
  room_type_id: number;
  branch_id: number;
  link_status: boolean;
};

type TRTMDFacilityItem = {
  className: string;
  name: string;
  id: number;
};

type TRoomTypeFacilitiesCardItem = {
  id: number;
  type: string;
  name_en: string;
  name_vi: string;
};

type TRoomTypeFacilitiesCard = {
  className: {
    class_en: string;
    class_vi: string;
  };
  items: TRoomTypeFacilitiesCardItem[];
};

interface IRoomType {
  key: React.Key;
  type_name: string;
  check_in_time: string;
  check_out_time: string;
  include_breakfast: boolean;
  number_rooms: string;
  facilities: TFacilityModel[];
}
