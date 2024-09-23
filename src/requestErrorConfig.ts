import type { RequestOptions } from "@@/plugin-request/request";
import type { RequestConfig } from "@umijs/max";
import { message, notification } from "antd";
import { getErrorData } from "./utils/common";
import { decryptToken, encryptToken } from "./utils/crypter";
import { keyLocalStorage, removeKey } from "./utils/local_storage";
import { postRefreshToken } from "./services/auth/callers";
import { SIGN_IN } from "./constants/link";

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

export const errorConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = "BizError";
        error.info = { errorCode, errorMessage, showType, data };
        throw error;
      }
    },
    errorHandler: async (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === "BizError") {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.name === "AxiosError") {
        // handle axios error
        if (error.code === "ERR_NETWORK") {
          message.error(error.message);
        } else {
          const tmpErr = error as TErrorResponse;
          const data = getErrorData(tmpErr);

          if (data && data.code === 401 && data.message.includes("expired")) {
            const tokens = decryptToken();
            try {
              const resp = await postRefreshToken(
                tokens[keyLocalStorage.REFRESH_TOKEN]
              );
              encryptToken(resp.access_token, resp.refresh_token);
              window.location.reload();
            } catch (error) {
              removeKey(keyLocalStorage.HASH_AUTH);
              window.location.href = SIGN_IN;
            }
          } else {
            message.error("The server has been shut down");
          }
        }
      } else if (error.request) {
        message.error("None response! Please retry.");
      } else {
        message.error("Request error, please retry.");
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      if (config.headers === undefined) {
        config.headers = {};
      }

      let accessToken = undefined;
      const reqFromS3 = config.baseURL?.includes("s3");
      if (!reqFromS3) {
        const tokens = decryptToken();
        if (tokens) accessToken = tokens[keyLocalStorage.TOKEN];
      }
      config.headers["Content-Type"] =
        config.headers["Content-Type"] ?? "application/json";
      if (accessToken) {
        config.headers.Authorization =
          config.headers.Authorization ?? `Bearer ${accessToken}`;
      }
      const url = config.url as string;
      return { ...config, url: `${url}` };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure;
      if (data?.success === false) {
        message.error("Request error, please retry.");
      }
      return response;
    },
  ],
};
