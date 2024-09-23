import { request } from "@umijs/max";
import {
  REFRESH_TOKEN_PATH,
  // SIGN_IN_PATH,
  SIGN_UP_HST_PATH,
  SIGN_UP_PATH,
} from "./paths";

export const postSignIn = async (signInRequest: TSignInRequest) => {
  // return request(SIGN_IN_PATH, {
  //   method: "POST",
  //   data: {
  //     ...signInRequest,
  //   },
  // });

  if (signInRequest.username === "" || signInRequest.password === "") {
    return {
      access_token: "",
      token_type: "",
      expires_in: 0,
      refresh_token: "",
    };
  }

  const response = {
    access_token: "fakeToken",
    token_type: "Bearer",
    expires_in: 3600 * 24 * 365,
    refresh_token: "fakeRefreshToken",
  };

  return response;
};

export const postSignUp = async (signUpRequest: TSignUpRequest) => {
  return request(SIGN_UP_PATH, {
    method: "POST",
    data: {
      ...signUpRequest,
    },
  });
};
export const postSignUpHST = async (signUpHSTRequest: TSignUpHSTRequest) => {
  return request(SIGN_UP_HST_PATH, {
    method: "POST",
    data: {
      ...signUpHSTRequest,
    },
  });
};

export const postRefreshToken = async (
  refreshToken: string
): Promise<TAuthResponse> => {
  return request(REFRESH_TOKEN_PATH, {
    method: "POST",
    data: {
      refresh_token: refreshToken,
    },
  });
};
