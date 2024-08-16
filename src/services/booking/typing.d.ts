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
