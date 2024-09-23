export const createRoom = {
  pages: {
    createRoom: {
      breadcrumb: {
        rooms: "Rooms",
        create: "Create",
      },
      step: {
        info: "Room Information",
        price: "Room Price",
        image: "Room Image",
      },
      form: {
        required: "This field is required",
        roomTypeLabel: "Room type",
        moveToRoomType: "Move to Room type",
        roomTypePlaceholder: "Select room type",
        roomNameLabel: "Room name",
        roomNamePlaceholder: "Enter room name",
        maxOccupancyLabel: "Max occupancy",
        suffixMaxOccupancy: "people",
        quantityLabel: "Quantity",
        bedTypeLabel: "Bed type",
        bedTypePlaceholder: "Select bed type",
        widthLabel: "Width",
        suffixMeter: "meter",
        lengthLabel: "Length",
        maxPriceLabel: "Max price",
        submitButton: "Submit",
        nextButton: "Next",
        backButton: "Back",
        estimatedPrice: "Est. price",
        estimatedRoomPriceIn: "Estimated room price is in",
        holiday: "Holiday",
        weekend: "Weekend",
        normalDay: "Normal day",
        onlineLabel: "Online",
        onCashLabel: "On cash",
        quantity: "Quantity",
        timeUnit: "Time unit",
        reduction: "Reduction",
        atLeast1Item: "At least 1 item",
        selectTimeUnit: "Select time unit",
        addFieldBtn: "Add field",
      },
      note: {
        note_roomType:
          "Create Room-types before creating Rooms to ensure organization and management",
        maxPrice:
          "Max price is the maximum price of the room. This value will decrease according to the reduction values you configure below. Room price for 1 day will be reduced according to the formula",
        formula: {
          maxPrice: "max price",
          reductionDay: "reduction for date type",
          reductionReservation: "reduction for booking time",
        },
        multipleDay:
          "If the user books multiple days, the room price per day will still be applied according to the above formula. The reduction value of the payment method will be applied to the total room charge.",
        paymentMethod:
          "The user's total room charge may vary according to payment method.",
        dateType:
          "You can configure the reduction value if you want the room price on holidays or weekends to be different from normal days. The reduction value of holiday will be applied to special days added to the Room Details screen.",
        bookingTime:
          "Room prices will be reduced according to the user's booking time",
        ifUserBook: "If user book",
        inAdvance: " in advance,",
        beReduced: "room price will be reduced by",
      },
      timeUnit: {
        hour: "hour",
        day: "day",
        week: "week",
        month: "month",
        year: "year",
      },
      collapse: {
        checkInTimeLabel: "Check-in time:",
        checkOutTimeLabel: "Check-out time:",
        includeBreakfastLabel: "Include breakfast:",
        facilityLabel: "Facility:",
        viewMore: "View more",
      },
      divider: {
        roomSize: "Room size",
        roomPrice: "Room price",
        reductionPaymentMethod: "Reduction for payment method",
        reductionForDateType: "Reduction for date type",
        reductionForReservationTime: "Reduction for booking time",
      },
      success: "Create room successfully",
    },
  },
};
