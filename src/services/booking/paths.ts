import { BOOKING_ENDPOINT } from "../endpoint";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const BOOKINGS_PATH = `${BOOKING_ENDPOINT}/partner/bookings`;
export const BOOKINGS_BY_ID = `${BOOKING_ENDPOINT}/partner/bookings/:id`;
export const APPROVE_ID_PATCH = `${BOOKING_ENDPOINT}/partner/bookings/:id/approve`;
export const REJECT_ID_PATCH = `${BOOKING_ENDPOINT}/partner/bookings/:id/reject`;
