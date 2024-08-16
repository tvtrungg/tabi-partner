import { request } from "@umijs/max";
import {
  BRANCH_PATH,
  BRANCH_BY_ID,
  CREATE_BM,
  UPDATE_ACTIVE_BRANCH,
  BRANCH_BOOKING_ANALYSIS_PATH,
  BRANCH_REVENUE_ANALYSIS_PATH,
} from "./paths";
import { interpolate } from "@/utils/common";

export const getBranches = async (
  l: number,
  p: number,
  f?: {
    [key: string]: any;
  }
) => {
  return request(BRANCH_PATH, {
    method: "GET",
    params: {
      l,
      p,
      f,
      s: "id",
    },
  });
};

export const getBranchById = async (id: number) => {
  return request(interpolate(BRANCH_BY_ID, { id }), {
    method: "GET",
  });
};

export const updateBranch = async (id: number, branch_data: TUpdateBranch) => {
  return request(interpolate(BRANCH_BY_ID, { id }), {
    method: "PATCH",
    data: branch_data,
  });
};

export const updateBranchPolicy = async (
  id: number,
  policy: TUpdateBranchPolicy
) => {
  return request(interpolate(BRANCH_BY_ID, { id }), {
    method: "PATCH",
    data: policy,
  });
};

export const postBranch = async (creation: TCreationBranch) => {
  return request(BRANCH_PATH, {
    method: "POST",
    data: creation,
  });
};

export const postSignUpBM = async (signUpRequest: TSignUpBMRequest) => {
  return request(CREATE_BM, {
    method: "POST",
    data: {
      ...signUpRequest,
    },
  });
};

export const updateActiveBranch = async () => {
  return request(UPDATE_ACTIVE_BRANCH, {
    method: "POST",
  });
};

export const getBranchBookingAnalysis = async (year: string) => {
  return request(BRANCH_BOOKING_ANALYSIS_PATH, {
    method: "GET",
    params: {
      year,
    },
  });
};

export const getBranchRevenueAnalysis = async (year: string) => {
  return request(BRANCH_REVENUE_ANALYSIS_PATH, {
    method: "GET",
    params: {
      year,
    },
  });
};
