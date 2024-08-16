type TCreationBranch = {
  address: string;
  branch_name: string;
  description: string;
  district: string;
  main_facilities: number[];
  province_city: string;
  reception_area: boolean;
  type_id: number;
  ward: string;
  cancellation_time_value: number;
  cancellation_time_unit: string;
  general_policy: string;
};

type TBranchResponse = {
  id: number;
  TCreationBranch;
};

type TBranch = {
  id: string;
  address: string;
  branch_name: string;
  description: string;
  district: string;
  full_address: string;
  province_city: string;
  reception_area: boolean;
  type: {
    id: number;
    label_en: string;
    label_vi: string;
  };
  ward: string;
};

type TBranchManager = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  last_login: timestamp;
};

type TSignUpBMRequest = {
  username: string;
  password: string;
  name: string;
  phone: string;
  branch_id: number;
};

type TRoomTypes = {
  id: number;
  type_name: string;
  check_in_time: timestamp;
  check_out_time: timestamp;
  include_breakfast: boolean;
  room_facilities: [];
};

type TTypeBranch = {
  id: number;
  class: string;
  label_en: string;
  label_vi: string;
  desc_en: string;
  desc_vi: string;
  order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type TRating = {
  id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: timestamp;
};

type TBranchDetails = {
  id: number;
  branch_name: string;
  address: string;
  full_address: string;
  province_city: string;
  district: string;
  ward: string;
  tax_number: string;
  website_url: string;
  description: string;
  reception_area: boolean;
  cancellation_time_value: number;
  cancellation_time_unit: string;
  general_policy: string;
  main_facilities: TFacilityModel[];
  branch_manager: TBranchManager;
  room_types: TRoomTypes[];
  type: TTypeBranch;
  is_active: boolean;
  ratings: TRating[];
};

type TUpdateBranch = {
  branch_name: string;
  email: string;
  type_id: number;
  address: string;
  full_address: string;
  description: string;
  province_city: string;
  district: string;
  ward: string;
  tax_number: string;
  website_url: string;
};

type TUpdateBranchPolicy = {
  cancellation_time_value: number;
  cancellation_time_unit: string;
  general_policy: string;
};

type TSignUpBMResponse = {
  id: number;
  branch_id: string;
  username: timestamp;
  name: string;
  email: string;
  phone: string;
};
