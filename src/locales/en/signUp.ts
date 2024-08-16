export const signUp = {
  signUp: {
    title: "Sign up",

    select_manage_branch: {
      title: "Select the type of account you want to create",
      subTitle:
        "Partner with our app to expand your business reach and attract more customers",
    },
    manage_single_branch: {
      title: "Sign up Branch Manager",
      subTitle: "Create an account to get started",
      label: "Manage single branch",
      description:
        "Stay on top of one branch effortlessly with our management tools.",
    },
    manage_multi_branch: {
      label: "Manage multiple branches",
      description:
        "Juggle multiple branches easily with our streamlined management solutions.",
    },

    steps: {
      step1: {
        label: "Account Regist.",
        title: "Account Registration - Representative",
        form: {
          username: {
            label: "Username",
            required: "Please input your username!",
            rule: "Must be at least 4 characters.",
            placeholder: "Username",
          },
          fullname: {
            label: "Fullname",
            required: "Please input your fullname!",
            placeholder: "Fullname",
          },
          paypalSupport: {
            label: "Support Paypal",
            required: "Please select Paypal Payment Support!",
          },
          email: {
            label: "Email Paypal account",
            required: "Please input your Paypal account email!",
            placeholder: "Paypal account email",
          },
          phoneNumber: {
            label: "Phone number",
            required: "Please input your phone number!",
            placeholder: "Phone number",
          },
          password: {
            label: "Password",
            required: "Please input your password!",
            rule: "Must be at least 4 characters.",
            placeholder: "Password",
          },
          reenterPassword: {
            label: "Re-enter password",
            required: "Please re-enter your password!",
            rule: "Passwords do not match!",
            placeholder: "Re-enter password",
          },
          termsAndCondtitions: {
            text1:
              "By clicking Next, you are indicating that you have read and acknowledge the ",
            termsOfService: "Terms of Service",
            text2: " and ",
            privacyNotice: "Privacy Notice",
            text3: ".",
          },
        },
      },
      step2: {
        label: "Email Verification",
        title: "Email Verification",
        form: {
          emailVerificationNotice:
            "Please check your e-mail for the verification code that has just been sent and enter the code in the box below",
          email: {
            label: "Email",
            placeholder: "Email",
            updateEmail: "Update",
          },
          resendVeificationCode: "Resend verification code",
        },
      },
      step3: {
        label: "Profile Completion",
        title: "Profile Completion - Company",
        form: {
          businessInformation: {
            label: "Business Information",
            companyName: {
              label: "Company Name",
              required: "Please input your company name!",
              placeholder: "Company name",
            },
            shortName: {
              label: "Short name",
              required: "Please input your short name!",
              placeholder: "Short name",
            },
            description: {
              label: "Description",
              placeholder: "Description",
              required: "Please input your company description!",
            },
            taxCode: {
              label: "Tax code",
              required: "Please input your tax code!",
              placeholder: "Tax code",
            },
            website: {
              label: "Website",
              required: "Please input your company website link!",
              placeholder: "website link",
            },
            address: {
              label: "Address",
              required: "Please input your address!",
              placeholder: "Address of your company",
            },
            provinceCity: {
              label: "Province/City",
              required: "Please select your company's province/city!",
              placeholder: "Province/City",
            },
            district: {
              label: "District",
              required: "Please select your company's district!",
              placeholder: "District",
            },
            ward: {
              label: "Ward",
              required: "Please select your company's ward!",
              placeholder: "Ward",
            },
          },
          additionalInformation: {
            label: "Additional Information",
            companyImage: {
              label: "Company Image",
              required: "Please upload your company image!",
              mainPlaceholder: "Click or drag file to this area to upload",
              subPlaceholder:
                "Upload an image of your company so that others can see and trust the authenticity of your service",
              uploadSuccessfully: "file uploaded successfully.",
              uploadFailed: "file uploaded failed.",
            },
          },
        },
      },
      step4: {
        label: "Contract Signing",
        title: "Contract Signing",
        form: {
          agree: "Agree to the contract terms and conditions",
          confirmationError:
            "Please read and agree to the contract terms by checking the box",
          registrationError:
            "Please fill out all the fields in the registration form and try again.",
        },
      },
      buttonNext: "Next",
      buttonPrevious: "Previous",
      buttonRegister: "Register",
    },
  },
};
