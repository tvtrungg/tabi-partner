import { getKey, keyLocalStorage, setKey } from "@/utils/local_storage";
import { ENCRYPT_KEY } from "@/constants/auth";
import * as CryptoJS from "crypto-js";

export const encryptToken = (token: string, refresh_token: string) => {
  const hash = CryptoJS.AES.encrypt(
    JSON.stringify({
      [keyLocalStorage.TOKEN]: token,
      [keyLocalStorage.REFRESH_TOKEN]: refresh_token,
    }),
    ENCRYPT_KEY
  ).toString();
  setKey(keyLocalStorage.HASH_AUTH, hash);
};

export const decryptToken = () => {
  const hash = getKey(keyLocalStorage.HASH_AUTH);
  if (hash) {
    const decrypt = CryptoJS.AES.decrypt(hash, ENCRYPT_KEY).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypt);
  }

  return undefined;
};
