export default {
  "GET /partner/me": (req: Request, res: any) => {
    let response = {
      id: 1,
      name: "Robinson",
      username: "admin",
      email: "admin@gmail.com",
      phone: "0123123123",
      role: "HST",
      place_id: 1,
    };

    return res.status(200).send(response);
  },
};
