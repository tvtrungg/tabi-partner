import { useMutation, useQuery } from "react-query";
import {
  getBranches,
  getBranchById,
  postBranch,
  postSignUpBM,
  updateActiveBranch,
  updateBranch,
  updateBranchPolicy,
  getBranchBookingAnalysis,
  getBranchRevenueAnalysis,
} from "./callers";

const keyBranch = {
  branches: "BRANCHES",
  branches_details: "BRANCHES_DETAILS",
  create_bm: "CREATE_BM",
  update_active: "UPDATE_ACTIVE",
  booking_analysis: "BOOKING_ANALYSIS",
  revenue_analysis: "REVENUE_ANALYSIS",
};

export const useGetBranches = (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return useQuery<TListResponse<TBranch>, TErrorResponse>({
    queryKey: [keyBranch.branches, l, p, f],
    queryFn: () => getBranches(l, p, f),
  });
};

export const useGetBranchById = (id: number) => {
  return useQuery<TBranchDetails, TErrorResponse>({
    queryKey: [keyBranch.branches_details, id],
    queryFn: () => {
      return getBranchById(id);
    },
  });
};

export const usePostBranch = (
  onSuccess?: TOnSuccessCallback<TBranchResponse>
) => {
  return useMutation<TBranchResponse, TErrorResponse, TCreationBranch>({
    mutationKey: keyBranch.branches,
    mutationFn: (creation) => postBranch(creation),
    onSuccess,
  });
};

export const useUpdateBranch = (id: number, onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse, TUpdateBranch>({
    mutationKey: keyBranch.branches,
    mutationFn: (update) => updateBranch(id, update),
    onSuccess,
  });
};

export const useUpdateBranchPolicy = (id: number, onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse, TUpdateBranchPolicy>({
    mutationKey: keyBranch.branches,
    mutationFn: (policy) => updateBranchPolicy(id, policy),
    onSuccess,
  });
};

export const useSignUpBM = (
  onSuccess?: TOnSuccessCallback<TSignUpBMResponse>
) => {
  return useMutation<TSignUpBMResponse, TErrorResponse, TSignUpBMRequest>({
    mutationKey: keyBranch.create_bm,
    mutationFn: (signUpRequest) => postSignUpBM(signUpRequest),
    onSuccess,
  });
};

export const useUpdateActiveBranch = (onSuccess?: TCallback) => {
  return useMutation<null, TErrorResponse>({
    mutationKey: keyBranch.update_active,
    mutationFn: () => updateActiveBranch(),
    onSuccess,
  });
};

export const useGetBranchBookingAnalysis = (year: string) => {
  return useQuery<TBookingAnalysis[], TErrorResponse>({
    queryKey: [keyBranch.booking_analysis, year],
    queryFn: () => getBranchBookingAnalysis(year),
  });
};

export const useGetBranchRevenueAnalysis = (year: string) => {
  return useQuery<TRevenueAnalysis[], TErrorResponse>({
    queryKey: [keyBranch.revenue_analysis, year],
    queryFn: () => getBranchRevenueAnalysis(year),
  });
};
