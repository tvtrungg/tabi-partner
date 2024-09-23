import { createBranch } from "./en/createBranch";
import { branches } from "./en/branches";
import { signIn } from "./en/signIn";
import { signUp } from "./en/signUp";
import { createRoom } from "./en/createRoom";
import { roomType } from "./en/roomType";
import { branchDetails } from "./en/branchDetails";
import { roomDetails } from "./en/roomDetails";
import { createBM } from "./en/createBM";
import { rooms } from "./en/rooms";
import { booking } from "./en/booking";
import { company } from "./en/company";

export default {
  landing: {
    navbar: {
      about: "About us",
      policy: "Policy",
      client: "Explore as a client",
      signIn: "Sign In",
    },
  },
  ...signIn,
  ...signUp,
  ...createBranch,
  ...branches,
  ...createRoom,
  ...roomType,
  ...branchDetails,
  ...roomDetails,
  ...createBM,
  ...rooms,
  ...company,
  ...booking,
  "component.sider.home": "Home",
  "component.sider.company": "Company",
  "component.sider.branches": "Branches",
  "component.sider.roomTypes": "Room types",
  "component.sider.branch": "Branch",
  "component.sider.rooms": "Rooms",
  "component.sider.booking": "Bookings",
  "pages.404.buttonText": "Back",
  "pages.404.subTitle": "Sorry, the page you visited does not exist.",
  account_dropdown: {
    role: {
      BMA: "Branch Manager",
      REP: "Representative",
      HST: "Host",
    },
    subItem: {
      subItem1: "Profile",
      subItem2: "Setting",
      subItem3: "Log out",
    },
  },
  delete: "Delete",
  yes: "Yes",
  no: "No",
  cancel: "Cancel",
  confirm: "Confirm",
  approve: "Approve",
  reject: "Reject",
  save: "Save",
  agree: "Agree",
  status: {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    updated: "Updated",
    cancelled: "Cancelled",
  },
  analysis: {
    month: "Month",
    quantity: "Quantity",
    revenue: "Revenue",
  },
  versionNote:
    "This website is the mock version since our server has been shut down. Some functions may not work. Input anything to login.",
};
