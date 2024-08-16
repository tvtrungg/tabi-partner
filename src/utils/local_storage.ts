export const keyLocalStorage = {
  TOKEN: "access_token",
  ROLE: "role",
  REFRESH_TOKEN: "refresh_token",
  CREATION_BRANCH: "creation_branch",
  CREATION_HOST: "creation_host",
  CREATION_ROOM: "creation_room",
  EDIT_PRICE_DETAILS: "edit_price_details",
  HASH_AUTH: "hash_auth",
  PARTNER_INFO: "partner_info",
  HOST_INFO: "host_info",
};

export const setKey = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getKey = (key: string) => {
  return localStorage.getItem(key);
};

export const removeKey = (key: string) => {
  localStorage.removeItem(key);
};
