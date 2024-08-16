import { BOOKING_ENDPOINT } from "../endpoint";
// const LOCAL_HOST = "http://localhost:8000";

export const GET_ROOM_TYPE_PATH = `${BOOKING_ENDPOINT}/partner/room-types`;
export const GET_ROOM_TYPE_FOR_BM_PATH = `${BOOKING_ENDPOINT}/partner/room-types`;
export const GET_ROOM_TYPE_OF_BRANCH_BY_ID_PATH = `${BOOKING_ENDPOINT}/partner/room-types`;
export const POST_ROOM_TYPE_TO_BM_BY_ID_PATH = `${BOOKING_ENDPOINT}/partner/room-types`;
export const UPDATE_ROOM_TYPE_FACILITIES_PATH = `${BOOKING_ENDPOINT}/partner/room-types/:id`;
export const LINK_UNLINK_ROOM_TYPE_PATH = `${BOOKING_ENDPOINT}/partner/room-types/link-status`;
export const GET_ROOM_TYPE_TO_LINK_BRANCH = `${BOOKING_ENDPOINT}/partner/room-types/all`;
