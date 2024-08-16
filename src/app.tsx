import { type RunTimeLayoutConfig } from "@umijs/max";
import { Fragment } from "react";
import { errorConfig } from "./requestErrorConfig";
import { getMe } from "./services/me/callers";
import { decryptToken } from "./utils/crypter";
import { keyLocalStorage, removeKey } from "./utils/local_storage";
import { SIGN_IN } from "./constants/link";

export async function getInitialState() {
  const tokens = decryptToken();
  let currentUser = {};

  if (tokens && tokens[keyLocalStorage.TOKEN]) {
    try {
      const me = await getMe();
      if (me) {
        currentUser = { ...me };
      }
    } catch (error) {
      removeKey(keyLocalStorage.HASH_AUTH);
      window.location.href = SIGN_IN;
    }
  }

  return {
    ...currentUser,
  };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    childrenRender: (children) => {
      return <Fragment>{children}</Fragment>;
    },
    unAccessible: <div>unAccessible</div>,
    noFound: <div>noFound</div>,
  };
};

export const request = {
  ...errorConfig,
};
