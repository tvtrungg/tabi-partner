const listBookings = [
  {
    id: 1,
    user_id: 1,
    user: {
      id: 1,
      first_name: "Trung",
      last_name: "Doe",
      dob: "1990-01-01",
      username: "john_doe",
      email: "john@gmail.com",
      phone: "0123456789",
    },
    room_id: 1,
    room_name: "Room 1",
    quantity: 5,
    check_in_date: "2024-07-12T05:00:00Z",
    check_out_date: "2024-07-12T05:00:00Z",
    total_price: "200000",
    payment_method: "ONLINE",
    status: "PEN",
    note: "Note 1",
    created_at: "2024-01-01T05:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    user: {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      dob: "1990-01-01",
      username: "jane_doe",
      email: "jane@gmail.com",
      phone: "0121212121",
    },
    room_id: 2,
    room_name: "Room 2",
    quantity: 5,
    check_in_date: "2024-07-02T05:00:00Z",
    check_out_date: "2024-07-02T05:00:00Z",
    total_price: "200000",
    payment_method: "CASH",
    status: "REJ",
    note: "Note 2",
    created_at: "2024-01-01T05:00:00Z",
  },
  {
    id: 3,
    user_id: 3,
    user: {
      id: 3,
      first_name: "Tommy",
      last_name: "Doe",
      dob: "1990-01-01",
      username: "john_doe",
      email: "tommy@gmail.com",
      phone: "0868686868",
    },
    room_id: 3,
    room_name: "Room 3",
    quantity: 5,
    check_in_date: "2024-03-06T05:00:00Z",
    check_out_date: "2024-03-10T05:00:00Z",
    total_price: "200000",
    payment_method: "ONLINE",
    status: "APP",
    note: "Note 3",
    created_at: "2024-01-01T05:00:00Z",
  },
  {
    id: 4,
    user_id: 4,
    user: {
      id: 4,
      first_name: "Tommy",
      last_name: "Doe",
      dob: "1990-01-01",
      username: "john_doe",
      email: "jackma@gmail.com",
    },
    room_id: 4,
    room_name: "Room 4",
    quantity: 5,
    check_in_date: "2024-03-07T05:00:00Z",
    check_out_date: "2024-02-10T05:00:00Z",
    total_price: "200000",
    payment_method: "ONLINE",
    status: "UPD",
    note: "Note 4",
    created_at: "2024-01-01T05:00:00Z",
  },
  {
    id: 5,
    user_id: 5,
    user: {
      id: 5,
      first_name: "Natalya",
      last_name: "Doe",
      dob: "1990-01-01",
      username: "natalya_doe",
      email: "natalyadoe@gmail.com",
    },
    reason: "I want to cancel this booking",
    room_id: 5,
    room_name: "Room 5",
    quantity: 5,
    check_in_date: "2024-02-05T05:00:00Z",
    check_out_date: "2024-02-10T05:00:00Z",
    total_price: "200000",
    payment_method: "ONLINE",
    status: "CAN",
    note: "Note 5",
    created_at: "2024-01-01T05:00:00Z",
  },
  {
    id: 6,
    user_id: 6,
    user: {
      id: 6,
      first_name: "Robert",
      last_name: "Doe",
      dob: "1990-01-01",
      username: "natalya_doe",
      email: "natalyadoe@gmail.com",
    },
    reason: "Because I have another plan",
    room_id: 6,
    room_name: "Room 6",
    quantity: 5,
    check_in_date: "2024-02-05T05:00:00Z",
    check_out_date: "2024-02-10T05:00:00Z",
    total_price: "200000",
    payment_method: "ONLINE",
    status: "CAN",
    note: "Note 6",
    created_at: "2024-01-01T05:00:00Z",
  },
];

export default {
  "GET /partner/bookings": (req: Request, res: any) => {
    const url = new URL(req.url || "", "http://localhost:8000");
    let response = {};
    let limit = 0;
    url.searchParams.forEach((value, key) => {
      if (key === "l") limit = Number(value);
      if (key === "p") {
        const page_n = Number(value);
        const start = limit * (page_n - 1);
        const end = limit * page_n;
        response = listBookings.slice(start, end);
      }
      if (key === "f") {
        const filter = JSON.parse(value);
        response = listBookings.filter((booking: { [key: string]: any }) => {
          for (const key in filter) {
            if (booking[key] !== filter[key]) return false;
          }
          return true;
        });
      }
    });
    return res.status(200).send({ data: response, total: listBookings.length });
  },
};
