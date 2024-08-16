type TMeResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  place_id: number; // if role is BM, place_id is branch_id else if role is REP, place_id is company_id
};
