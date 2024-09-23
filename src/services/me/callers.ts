// import { request } from "@umijs/max";
// import { ME_PATH } from "./paths";

export const getMe = async (): Promise<TMeResponse> => {
  // return request(ME_PATH, {
  //   method: "GET",
  // });

  let response = {
    id: 1,
    name: "Robinson",
    username: "admin",
    email: "admin@gmail.com",
    phone: "0123123123",
    role: "HST",
    place_id: 1,
  };

  return response;
};
