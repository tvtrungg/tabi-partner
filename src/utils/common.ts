import { EN_LOCALE, EN_PARAMS, VI_LOCALE, VI_PARAMS } from "@/constants/locale";
import { DATE_FORMAT } from "@/constants/table";
import dayjs, { Dayjs } from "dayjs";

export const getRootPath = (location: string) => {
  const pathArr = location.split("/");
  return pathArr[1];
};

export const getErrorData = (error: TErrorResponse): TError => {
  return error.response.data?.error;
};

export const getLocaleParams = (locale: string) => {
  switch (locale) {
    case EN_LOCALE:
      return EN_PARAMS;
    case VI_LOCALE:
      return VI_PARAMS;
    default:
      return EN_PARAMS;
  }
};

export const getLandingPath = (location: string) => {
  const pathArr = location.split("/");
  return pathArr[1];
};

export const getTime = (date: string | undefined) => {
  if (!date) return "";
  const timeHour = date.split("T");
  const time = timeHour[1].split("+");
  return time[0];
};

export function interpolate(
  endpoint: string,
  params: Record<string, any>
): string {
  let interpolatedEndpoint = endpoint;
  for (const [key, value] of Object.entries(params)) {
    interpolatedEndpoint = interpolatedEndpoint.replace(`:${key}`, value);
  }
  return interpolatedEndpoint;
}

export function getTimeHourAndMinute(timeString: string): string {
  const inputTime = new Date(timeString);

  const hours = inputTime.getHours().toString().padStart(2, "0");
  const minutes = inputTime.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function formatCurrency(amount: string | number): string {
  if (!amount) return "";
  const formattedAmount: string =
    typeof amount === "string" ? amount : amount.toString();

  const parts: string[] = formattedAmount.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}

export function removeComma(amount: string) {
  if (!amount) return "";
  return amount.replace(/,/g, "");
}

export function formatMessage(
  intl: any, //IntlShape
  id: string,
  values?: Record<string, string | number>
) {
  return intl.formatMessage({ id }, values);
}

export function validatePhoneNumber(intl: any, phoneNumber: number | string) {
  const stringPhoneNumber = phoneNumber.toString();

  // Regular expressions for validation
  const digitOnlyRegex = /^\d+$/;
  const startsWithZeroRegex = /^0/;
  const exactly10DigitsRegex = /^\d{10}$/;
  const repetitivePatternRegex = /^(.)\1+$/; // Check for repetitive patterns

  if (!digitOnlyRegex.test(stringPhoneNumber)) {
    return formatMessage(intl, "pages.createBM.phone.invalidFormat_number");
  }

  if (!startsWithZeroRegex.test(stringPhoneNumber)) {
    return formatMessage(intl, "pages.createBM.phone.invalidFormat_has0");
  }

  if (!exactly10DigitsRegex.test(stringPhoneNumber)) {
    return formatMessage(intl, "pages.createBM.phone.invalidFormat_10");
  }

  if (repetitivePatternRegex.test(stringPhoneNumber)) {
    return formatMessage(intl, "pages.createBM.phone.invalidFormat_identical");
  }

  return null;
}

export function convertArrayToString(array: string[]): string {
  const formattedFilters: string[] = [];

  array.forEach((filter) => {
    formattedFilters.push(`"${filter}"`);
  });

  return `[${formattedFilters.join(", ")}]`;
}

export const formattedTime = (time: Dayjs | null): string => {
  if (!time) return "";
  const date = dayjs(time).set("second", 0);
  return `${DATE_FORMAT}${date.format("HH:mm:ss")}Z`;
};

export const formattedTimeMutate = (time: string) => {
  const date = dayjs(time).set("second", 0);
  return DATE_FORMAT + date.toISOString().split("T")[1].split(".")[0] + "Z";
};
