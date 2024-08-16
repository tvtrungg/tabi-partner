export const roomType = {
  roomType: {
    title: "Room Types",
    table: {
      includeBreakfastValue: {
        included: "Included",
        notIncluded: "Not included",
      },
      filter: {
        search: "Search",
        reset: "Reset",
      },
      columnLabels: {
        roomType: "Type Name",
        checkinTime: "Check-in Time",
        checkoutTime: "Check-out Time",
        includeBreakfast: "Include Breakfast",
        action: "Action",
      },
    },
    createRoomTypeForm: {
      title: "Create room type",
      roomType: {
        label: "Room type name",
        required: "Please input room type name!",
        placeholder: "Room type name",
      },
      checkinTime: {
        label: "Check-in time",
        required: "Please input check-in time!",
        placeholder: "Check-in time",
      },
      checkoutTime: {
        label: "Check-out time",
        required: "Please input check-out time!",
        placeholder: "Check-out time",
      },
      includeBreakfast: {
        label: "Include breakfast",
      },
      buttonSave: "Save",
      buttonOk: "Create",
      buttonCancel: "Cancel",
      messageSuccess: "Room type created successfully",
    },
    editRoomTypeForm: {
      title: "Edit room type",
      roomType: {
        label: "Room type name",
        required: "Please input room type name!",
        placeholder: "Room type name",
        rule: "Must be at least 4 characters.",
      },
      checkinTime: {
        label: "Check-in time",
        required: "Please input check-in time!",
        placeholder: "Check-in time",
      },
      checkoutTime: {
        label: "Check-out time",
        required: "Please input check-out time!",
        placeholder: "Check-out time",
      },
      includeBreakfast: {
        label: "Include breakfast",
      },
      facilities: {
        label: "Facilities",
        required: "Please select facilities!",
      },
      buttonOk: "Save",
      buttonCancel: "Cancel",
      messageSuccess: "Room type updated successfully",
      messageSuccessFacilities: "Room type facilities updated successfully",
    },
    linkForm: {
      title: "Link room type to branch manager",
      roomType: {
        label: "Room type name",
        placeholder: "Select room type to link",
      },
      checkinTime: {
        label: "Check-in time",
      },
      checkoutTime: {
        label: "Check-out time",
      },
      includeBreakfast: {
        label: "Include breakfast",
      },
      roomFacilities: {
        label: "Room facilities",
      },
      buttonOk: "Link",
      buttonCancel: "Cancel",
      messageSuccess: "Room type linked successfully",
    },
    deleteRoomType: {
      title: "Delete this room type",
      description: "Are you sure to delete this room type from current branch?",
      buttonOk: "Yes",
      buttonCancel: "No",
      messageSuccess: "Room type deleted successfully",
    },
  },
};
