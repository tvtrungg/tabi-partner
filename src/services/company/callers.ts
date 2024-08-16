import { request } from "@umijs/max";
import {
  COMPANY_BOOKING_ANALYSIS_PATH,
  COMPANY_PATH,
  COMPANY_REVENUE_ANALYSIS_PATH,
} from "./paths";

export const getInfoCompany = async () => {
  return request(COMPANY_PATH, {
    method: "GET",
  });
};

export const updateInfoCompany = async (company_data: TCompanyUpdate) => {
  return request(COMPANY_PATH, {
    method: "PATCH",
    data: company_data,
  });
};

export const getCompanyBookingAnalysis = async (year: string) => {
  return request(COMPANY_BOOKING_ANALYSIS_PATH, {
    method: "GET",
    params: {
      year,
    },
  });
};

export const getCompanyRevenueAnalysis = async (year: string) => {
  return request(COMPANY_REVENUE_ANALYSIS_PATH, {
    method: "GET",
    params: {
      year,
    },
  });
};
