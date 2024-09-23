declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.pdf";
declare module "*.json";
declare module "omit.js";
declare module "numeral";
declare module "@antv/data-set";
declare module "mockjs";
declare module "react-fittext";
declare module "bizcharts-plugin-slider";

declare const REACT_APP_ENV: "test" | "dev" | "pre" | false;

type TError = {
  code: number;
  type: string;
  message: string;
};

type TErrorResponse = {
  response: {
    data: {
      error: TError;
    };
  };
};

type TSignInRequest = {
  username: string;
  password: string;
};

type TSignUpRequest = TSignUpStep1Request & TSignUpStep2Request;

type TSignUpHSTRequest = TSignUpStep1Request & {
  branch_name: string;
  address: string;
  province_city: string;
  district: string;
  ward: string;
  tax_number: string;
  website_url: string;
  description: string;
  reception_area: boolean;
  main_facilities: number[];
  type_id: number;
  cancellation_time_unit: string;
  cancellation_time_value: number;
  general_policy: string;
};

type TSignUpStep1Request = {
  username: string;
  full_name: string;
  paypal_support: boolean;
  email: string;
  phone: string;
  password: string;
  reenterPassword: string;
};

type TSignUpStep2Request = {
  company_name: string;
  short_name: string;
  description: string;
  tax_number: string;
  website_url: string;
};

type TFacilityModel = {
  id: number;
  type: string;
  class_en: string;
  class_vi: string;
  name_en: string;
  name_vi: string;
};

type TRoomModel = {
  id: number;
  status: string;
  room_name: string;
  max_occupancy: string;
  width: number;
  length: number;
  available: string;
  check_in_date: string;
  check_out_date: string;
  price_vn: number;
  price_us: number;
  room_type_id: number;
  bed_type_id: number;
};
type TRoomTypeBM = {
  id: number;
  type_name: string;
  check_in_time: string;
  check_out_time: string;
  include_breakfast: boolean;
  facilities: TFacilityModel[];
};
type TCallback = () => void;

type TOnErrorCallback = (error: TErrorResponse) => void;
type TOnSuccessCallback<T> = (data: T) => void;

type TListResponse<T> = {
  data: T[];
  total: number;
};
