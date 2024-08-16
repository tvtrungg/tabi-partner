import { useMutation } from "react-query";
import { postSignIn, postSignUp, postSignUpHST } from "./callers";
import { encryptToken } from "@/utils/crypter";
import { HOME } from "@/constants/link";

export const keyAuth = {
  signIn: "SIGN_IN",
  signUp: "SIGN_UP",
  signUpHST: "SIGN_UP_HST",
};

export const saveToken = (accessToken: string, refreshToken: string) => {
  encryptToken(accessToken, refreshToken);
  window.location.href = HOME;
};

export const usePostSignIn = () => {
  return useMutation<TAuthResponse, TErrorResponse, TSignInRequest>({
    mutationKey: keyAuth.signIn,
    mutationFn: (signInRequest) => postSignIn(signInRequest),
    onSuccess: (resp) => {
      saveToken(resp.access_token, resp.refresh_token);
    },
  });
};

export const usePostSignUp = () => {
  return useMutation<TAuthResponse, TErrorResponse, TSignUpRequest>({
    mutationKey: keyAuth.signUp,
    mutationFn: (signUpRequest) => postSignUp(signUpRequest),
    onSuccess: (resp) => {
      saveToken(resp.access_token, resp.refresh_token);
    },
  });
};

export const usePostSignUpHST = (
  onSuccess: TOnSuccessCallback<TSignUpHSTResponse>
) => {
  return useMutation<TSignUpHSTResponse, TErrorResponse, TSignUpHSTRequest>({
    mutationKey: keyAuth.signUpHST,
    mutationFn: (signUpRequest) => postSignUpHST(signUpRequest),
    onSuccess,
  });
};
