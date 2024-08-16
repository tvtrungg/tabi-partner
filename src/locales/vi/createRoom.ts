export const createRoom = {
  pages: {
    createRoom: {
      breadcrumb: {
        rooms: "Các phòng",
        create: "Tạo mới",
      },
      step: {
        info: "Thông tin phòng",
        price: "Giá phòng",
        image: "Hình ảnh phòng",
      },
      form: {
        required: "Trường này là bắt buộc",
        roomTypeLabel: "Loại phòng",
        moveToRoomType: "Chuyển đến Loại phòng",
        roomTypePlaceholder: "Chọn loại phòng",
        roomNameLabel: "Tên phòng",
        roomNamePlaceholder: "Nhập tên phòng",
        maxOccupancyLabel: "Số người tối đa",
        suffixMaxOccupancy: "người",
        quantityLabel: "Số lượng",
        bedTypeLabel: "Loại giường",
        bedTypePlaceholder: "Chọn loại giường",
        widthLabel: "Chiều rộng",
        suffixMeter: "mét",
        lengthLabel: "Chiều dài",
        maxPriceLabel: "Giá tối đa",
        submitButton: "Tạo mới",
        nextButton: "Tiếp theo",
        backButton: "Quay lại",
        estimatedPrice: "Giá ước tính",
        estimatedRoomPriceIn: "Giá ước tính của phòng vào",
        holiday: "Ngày lễ",
        weekend: "Cuối tuần",
        normalDay: "Ngày thường",
        onlineLabel: "Online",
        onCashLabel: "Tiền mặt",
        quantity: "Số lượng",
        timeUnit: "Đơn vị thời gian",
        reduction: "Giá trị giảm",
        atLeast1Item: "Ít nhất 1 mục",
        selectTimeUnit: "Chọn đơn vị thời gian",
        addFieldBtn: "Thêm trường",
      },
      note: {
        note_roomType:
          "Tạo Loại phòng trước khi tạo Phòng để đảm bảo tổ chức và quản lý",
        maxPrice:
          "Giá tối đa là giá phòng tối đa. Giá trị này sẽ giảm theo các giá trị giảm bạn cấu hình bên dưới. Giá phòng cho 1 ngày sẽ giảm theo công thức",
        formula: {
          maxPrice: "giá tối đa",
          reductionDay: "giảm giá theo loại ngày",
          reductionReservation: "giảm giá theo thời gian đặt phòng",
        },
        multipleDay:
          "Nếu người dùng đặt nhiều ngày thì giá phòng mỗi ngày vẫn được áp dụng theo công thức trên. Giá trị giảm của phương thức thanh toán sẽ được áp dụng vào tổng tiền phòng.",
        paymentMethod:
          "Tổng tiền phòng của người dùng có thể thay đổi theo phương thức thanh toán.",
        dateType:
          "Bạn có thể cấu hình giá trị giảm nếu muốn giá phòng vào ngày lễ hoặc cuối tuần khác với ngày thường. Giá trị giảm của ngày lễ sẽ được áp dụng vào các ngày đặc biệt được thêm vào màn hình Chi tiết phòng.",
        bookingTime:
          "Giá phòng sẽ được giảm theo thời gian đặt phòng của người dùng",
        ifUserBook: "Nếu người dùng đặt trước",
        inAdvance: ",",
        beReduced: "giá phòng sẽ giảm",
      },
      timeUnit: {
        hour: "giờ",
        day: "ngày",
        week: "tuần",
        month: "tháng",
        year: "năm",
      },
      collapse: {
        checkInTimeLabel: "Giờ nhận phòng:",
        checkOutTimeLabel: "Giờ trả phòng:",
        includeBreakfastLabel: "Bao gồm bữa sáng:",
        facilityLabel: "Tiện ích:",
        viewMore: "Xem thêm",
      },
      divider: {
        roomSize: "Kích thước phòng",
        roomPrice: "Giá phòng",
        reductionPaymentMethod: "Giảm giá theo phương thức thanh toán",
        reductionForDateType: "Giảm giá theo loại ngày",
        reductionForReservationTime: "Giảm giá theo thời gian đặt phòng",
      },
      success: "Tạo phòng thành công",
    },
  },
};
