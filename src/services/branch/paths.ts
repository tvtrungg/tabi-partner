import { BOOKING_ENDPOINT } from "../endpoint";
// const LOCAL_HOST = "http://localhost:8000";

export const BRANCH_PATH = `${BOOKING_ENDPOINT}/partner/branches`;
export const BRANCH_BY_ID = `${BOOKING_ENDPOINT}/partner/branches/:id`;
export const UPDATE_ACTIVE_BRANCH = `${BOOKING_ENDPOINT}/partner/branches/activate`;
export const CREATE_BM = `${BOOKING_ENDPOINT}/partner/branch-managers/register`;
export const BRANCH_BOOKING_ANALYSIS_PATH = `${BOOKING_ENDPOINT}/partner/branches/analyses/booking-request-quantity`;
export const BRANCH_REVENUE_ANALYSIS_PATH = `${BOOKING_ENDPOINT}/partner/branches/analyses/revenues`;
