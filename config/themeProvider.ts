import colors from "./colors";
export default {
  token: {
    //colors
    colorPrimary: colors["primary-dominant"],
    colorPrimaryTextHover: colors["primary-dominant-dark"],
    colorLinkHover: colors["primary-dominant-dark"],
    colorPrimaryTextActive: colors["primary-dominant-dark"],
    colorLink: colors["primary-dominant"],
    colorPrimaryText: colors["text-light"],
    colorText: colors["text-dark"],
    colorSuccess: colors["color-success"],
    colorError: colors["color-error"],

    //typo
    fontSizeHeading1: "40px",
    fontSizeHeading2: "34px",
    fontSizeHeading3: "28px",
    fontSizeHeading4: "24px",
    fontSizeHeading5: "20px",
    fontSizeHeading6: "16px",
    fontSize: "14px",
    lineHeightHeading1: "48px",
    lineHeightHeading2: "40px",
    lineHeightHeading3: "36px",
    lineHeightHeading4: "32px",
    lineHeightHeading5: "28px",
    lineHeightHeading6: "24px",
    lineHeight: 1.5,
    fontWeightStrong: 600,
  },
  components: {
    Table: {
      rowHoverBg: colors["primary-dominant-lighter"],
      rowExpandedBg: colors["primary-dominant-lighter"],
      bodySortBg: colors["primary-dominant-lighter"],
      headerBg: colors["primary-dominant"],
      headerColor: colors["text-light"],
      headerSortActiveBg: colors["primary-dominant-light"],
      headerSortHoverBg: colors["primary-dominant-light"],
      headerSplitColor: colors["text-light"],
      rowSelectedBg: colors["primary-accent"],
      rowSelectedHoverBg: colors["primary-accent-light"],
    },
  },
};
