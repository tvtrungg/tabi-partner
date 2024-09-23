import { createBranch } from "./vi/createBranch";
import { branches } from "./vi/branches";
import { signIn } from "./vi/signIn";
import { signUp } from "./vi/signUp";
import { createRoom } from "./vi/createRoom";
import { roomType } from "./vi/roomType";
import { branchDetails } from "./vi/branchDetails";
import { roomDetails } from "./vi/roomDetails";
import { createBM } from "./vi/createBM";
import { rooms } from "./vi/rooms";
import { booking } from "./vi/booking";
import { company } from "./vi/company";

export default {
  landing: {
    navbar: {
      about: "Về chúng tôi",
      policy: "Chính sách",
      client: "Khách hàng",
      signIn: "Đăng Nhập",
    },
  },
  ...signIn,
  ...signUp,
  ...createBranch,
  ...branches,
  ...createRoom,
  ...roomType,
  ...roomDetails,
  ...branchDetails,
  ...createBM,
  ...rooms,
  ...company,
  ...booking,
  "component.sider.home": "Trang chủ",
  "component.sider.company": "Công ty",
  "component.sider.branches": "Các chi nhánh",
  "component.sider.roomTypes": "Các loại phòng",
  "component.sider.branch": "Chi nhánh",
  "component.sider.rooms": "Các phòng",
  "component.sider.booking": "Đặt phòng",
  "pages.404.buttonText": "Quay lại",
  "pages.404.subTitle": "Xin lỗi, trang bạn truy cập không tồn tại.",
  account_dropdown: {
    role: {
      BMA: "Quản lý chi nhánh",
      REP: "Người đại diện",
      HST: "Host",
    },
    subItem: {
      subItem1: "Thông tin cá nhân",
      subItem2: "Cài đặt",
      subItem3: "Đăng xuất",
    },
  },
  delete: "Xóa",
  yes: "Có",
  no: "Không",
  cancel: "Hủy",
  confirm: "Xác nhận",
  approve: "Phê duyệt",
  reject: "Từ chối",
  save: "Lưu",
  agree: "Đồng ý",
  status: {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
    updated: "Đã cập nhật",
    cancelled: "Đã hủy",
  },
  analysis: {
    month: "Tháng",
    quantity: "Số lượng",
    revenue: "Doanh thu",
  },
  versionNote:
    "Trang web này là phiên bản mô phỏng vì máy chủ của chúng tôi đã ngừng hoạt động. Một số chức năng có thể không hoạt động. Nhập bất kỳ để đăng nhập.",
};
