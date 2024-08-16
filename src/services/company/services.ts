import { useQuery, useMutation } from "react-query";
import {
  getCompanyBookingAnalysis,
  getInfoCompany,
  getCompanyRevenueAnalysis,
  updateInfoCompany,
} from "./callers";

const keyBookings = {
  company: "COMPANY",
  edit_company: "EDIT_COMPANY",
  booking_analysis: "BOOKING_ANALYSIS",
  revenue_analysis: "REVENUE_ANALYSIS",
};

export const useGetInfoCompany = () => {
  return useQuery<TCompany, TErrorResponse>({
    queryKey: [keyBookings.company],
    queryFn: () => getInfoCompany(),
  });
};

export const useUpdateInfoCompany = (
  onSuccess?: TOnSuccessCallback<TCompanyResponse>
) => {
  return useMutation<TCompanyResponse, TErrorResponse, TCompanyUpdate>({
    mutationKey: [keyBookings.edit_company],
    mutationFn: (creation) => updateInfoCompany(creation),
    onSuccess,
  });
};

export const useGetCompanyBookingAnalysis = (year: string) => {
  return useQuery<TBookingAnalysis, TErrorResponse>({
    queryKey: [keyBookings.booking_analysis, year],
    queryFn: () => getCompanyBookingAnalysis(year),
  });
};

export const useGetCompanyRevenueAnalysis = (year: string) => {
  return useQuery<TRevenueAnalysis, TErrorResponse>({
    queryKey: [keyBookings.revenue_analysis, year],
    queryFn: () => getCompanyRevenueAnalysis(year),
  });
};
