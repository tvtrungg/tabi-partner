type TBookingsList = {
  id: number;
  user_id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    dob: string;
    username: string;
    email: string;
    phone: string;
  };
  room_id: number;
  reason?: string;
  room_name: string;
  quantity: number;
  check_in_date: string;
  check_out_date: string;
  total_price: string;
  payment_method: string;
  status: string;
  note: string;
  created_at: string;
};

type TRejectRequest = {
  id: number;
  reason: string;
};

type TCompany = {
  id: number;
  company_name: string;
  short_name: string;
  description: string;
  website_url: string;
  tax_number: string;
  representative: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    role: string;
  };
};

type TCompanyUpdate = {
  email: string;
  company_name: string;
  short_name: string;
  description: string;
  website_url: string;
  tax_number: string;
};

type TCompanyResponse = {
  id: number;
  TCompany;
};

type TBookingAnalysis = {
  month: number;
  quantity: number;
};

type TRevenueAnalysis = {
  month: number;
  revenue: number;
};
