export const signUp = {
  signUp: {
    select_manage_branch: {
      title: "Chọn loại quản lý",
      subTitle:
        "Hợp tác với ứng dụng của chúng tôi để mở rộng phạm vi kinh doanh và thu hút nhiều khách hàng hơn",
    },
    manage_single_branch: {
      title: "Đăng ký Quản lý Chi nhánh",
      subTitle: "Tạo tài khoản để bắt đầu",
      label: "Quản lý một chi nhánh",
      description:
        "Dễ dàng giám sát hiệu quả của một chi nhánh với các công cụ quản lý thông minh của chúng tôi.",
    },
    manage_multi_branch: {
      label: "Quản lý nhiều chi nhánh",
      description:
        "Tinh chỉnh và điều phối hoạt động qua nhiều chi nhánh dễ dàng với các giải pháp quản lý toàn diện của chúng tôi.",
    },

    steps: {
      step1: {
        label: "Đăng Ký Tài Khoản",
        title: "Đăng Ký Tài Khoản - Đại Diện",
        form: {
          username: {
            label: "Tên người dùng",
            required: "Vui lòng nhập tên người dùng!",
            rule: "Phải có ít nhất 4 ký tự.",
            placeholder: "Tên người dùng",
          },
          fullname: {
            label: "Họ và tên",
            required: "Vui lòng nhập họ và tên của bạn!",
            placeholder: "Họ và tên",
          },
          paypalSupport: {
            label: "Hỗ trợ Paypal",
            required: "Vui lòng chọn hỗ trợ thanh toán Paypal!",
          },
          email: {
            label: "Email tài khoản Paypal",
            required: "Vui lòng nhập địa chỉ email tài khoản Paypal của bạn!",
            placeholder: "Email tài khoản Paypal",
          },
          phoneNumber: {
            label: "Số điện thoại",
            required: "Vui lòng nhập số điện thoại của bạn!",
            placeholder: "Số điện thoại",
          },
          password: {
            label: "Mật khẩu",
            required: "Vui lòng nhập mật khẩu của bạn!",
            rule: "Phải có ít nhất 4 ký tự.",
            placeholder: "Mật khẩu",
          },
          reenterPassword: {
            label: "Nhập lại mật khẩu",
            required: "Vui lòng nhập lại mật khẩu của bạn!",
            rule: "Mật khẩu không khớp!",
            placeholder: "Nhập lại mật khẩu",
          },
          termsAndCondtitions: {
            text1:
              "Bằng cách nhấp vào Tiếp theo, bạn đang thể hiện rằng bạn đã đọc và chấp nhận ",
            termsOfService: "Điều Khoản Dịch vụ",
            text2: " và ",
            privacyNotice: "Chính Sách Bảo mật",
            text3: ".",
          },
        },
      },
      step2: {
        label: "Xác Nhận Email",
        title: "Xác Nhận Email",
        form: {
          emailVerificationNotice:
            "Vui lòng kiểm tra email của bạn để nhận mã xác nhận và nhập mã vào ô dưới đây",
          email: {
            label: "Email",
            placeholder: "Email",
            updateEmail: "Cập nhật",
          },
          resendVeificationCode: "Gửi lại mã xác nhận",
        },
      },
      step3: {
        label: "Hoàn Thành Hồ Sơ",
        title: "Hoàn Thành Hồ Sơ - Công Ty",
        form: {
          businessInformation: {
            label: "Thông Tin Doanh Nghiệp",
            companyName: {
              label: "Tên công ty",
              required: "Vui lòng nhập tên công ty của bạn!",
              placeholder: "Tên công ty",
            },
            shortName: {
              label: "Tên viết tắt",
              required: "Vui lòng nhập tên viết tắt của doanh nghiệp!",
              placeholder: "Tên viết tắt",
            },
            description: {
              label: "Mô tả",
              placeholder: "Mô tả",
              required: "Vui lòng nhập mô tả công ty của bạn!",
            },
            taxCode: {
              label: "Mã số thuế",
              required: "Vui lòng nhập mã số thuế của bạn!",
              placeholder: "Mã số thuế",
            },
            website: {
              label: "Website",
              required: "Vui lòng nhập đường link website của công ty!",
              placeholder: "đường link website",
            },
            address: {
              label: "Địa chỉ",
              required: "Vui lòng nhập địa chỉ của bạn!",
              placeholder: "Địa chỉ công ty",
            },
            provinceCity: {
              label: "Tỉnh/Thành phố",
              required: "Vui lòng chọn tỉnh/thành phố của công ty!",
              placeholder: "Tỉnh/Thành phố",
            },
            district: {
              label: "Quận/Huyện",
              required: "Vui lòng chọn quận/huyện của công ty!",
              placeholder: "Quận/Huyện",
            },
            ward: {
              label: "Phường/Xã",
              required: "Vui lòng chọn phường/xã của công ty!",
              placeholder: "Phường/Xã",
            },
          },
          additionalInformation: {
            label: "Thông Tin Bổ Sung",
            companyImage: {
              label: "Hình ảnh công ty",
              required: "Vui lòng tải lên hình ảnh công ty của bạn!",
              mainPlaceholder: "Nhấp hoặc kéo file vào khu vực này để tải lên",
              subPlaceholder:
                "Tải lên hình ảnh của công ty để người khác có thể thấy và tin tưởng vào tính xác thực của dịch vụ của bạn",
              uploadSuccessfully: "file tải lên thành công.",
              uploadFailed: "file tải lên thất bại.",
            },
          },
        },
      },
      step4: {
        label: "Ký Hợp Đồng",
        title: "Ký Hợp Đồng",
        form: {
          agree: "Đồng ý với các điều khoản và điều kiện của hợp đồng",
          confirmationError:
            "Vui lòng đọc và đồng ý với các điều khoản của hợp đồng bằng cách đánh dấu vào ô",
          registrationError:
            "Vui lòng điền đầy đủ thông tin trong mẫu đăng ký và thử lại.",
        },
      },
      buttonNext: "Tiếp theo",
      buttonPrevious: "Quay lại",
      buttonRegister: "Đăng Ký",
    },
  },
};
