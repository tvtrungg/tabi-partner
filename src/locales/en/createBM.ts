export const createBM = {
  "pages.createBM": {
    title: "Create Branch Manager",
    name: {
      label: "Name",
      placeholder: "Name. Example: John Doe",
      required: "Please enter name",
      invalidFormat: "Please enter a string containing only letters or spaces.",
    },
    username: {
      label: "Username",
      placeholder: "Username. Example: johndoe",
      required: "Please enter username",
      invalidFormat:
        "Please enter a string containing only letters, numbers, or underscores.",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      required: "Please press the create password button",
    },
    email: {
      label: "Email",
      placeholder: "Email. Example: johndoe@gmail.com",
      required: "Please enter email",
      invalidFormat: "Please enter a valid email. Example: johndoe@gmail.com",
    },
    phone: {
      label: "Phone",
      placeholder: "Phone. Example: 812345678",
      required: "Please enter phone",
      invalidFormat_number: "Contains only numbers from [0-9].",
      invalidFormat_has0: "Phone number must start with 0.",
      invalidFormat_10:
        "Phone number must be exactly 10 digits. Example: 812345678",
      invalidFormat_identical:
        "Phone number cannot have all identical digits. Example: 0812345678",
    },
    create_success: "Create branch manager successfully !!!",
  },
};
