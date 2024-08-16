export const createBM = {
  "pages.createBM": {
    title: "Tạo quản lý chi nhánh",
    name: {
      label: "Họ tên",
      placeholder: "Họ tên người quản lí. Ví dụ: John Doe",
      required: "Vui lòng nhập họ tên",
      invalidFormat:
        "Vui lòng nhập một chuỗi chỉ chứa các chữ cái hoặc dấu cách.",
    },
    username: {
      label: "Tên đăng nhập",
      placeholder: "Tên đăng nhập. Ví dụ: johndoe",
      required: "Vui lòng nhập tên đăng nhập",
      invalidFormat:
        "Vui lòng nhập một chuỗi chỉ chứa chữ cái, số hoặc dấu gạch dưới.",
    },
    password: {
      label: "Mật khẩu",
      placeholder: "Mật khẩu",
      required: "Vui lòng nhấn nút tạo mật khẩu",
    },
    email: {
      label: "Email",
      placeholder: "Email. Ví dụ: johndoe@gmail.com",
      required: "Vui lòng nhập email",
      invalidFormat:
        "Vui lòng nhập đúng định dạng email. Ví dụ: johndoe@gmail.com",
    },
    phone: {
      label: "Điện thoại",
      placeholder: "Điện thoại. Ví dụ: 812345678",
      required: "Vui lòng nhập số điện thoại",
      invalidFormat_number: "Chỉ chứa các số từ [0-9].",
      invalidFormat_has0: "Số điện thoại phải bắt đầu bằng số 0.",
      invalidFormat_10:
        "Số điện thoại phải có đúng 10 chữ số. Ví dụ: 812345678",
      invalidFormat_identical:
        "Số điện thoại không được có tất cả các chữ số giống nhau. Ví dụ: 0812345678",
    },
    create_success: "Tạo quản lý chi nhánh thành công !!!",
  },
};
