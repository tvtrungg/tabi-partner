// import { FormattedMessage } from "@umijs/max";

export const LandingItems: TLandingItem[] = [
  {
    key: "about",
    label: "About us",
    url: "https://tabi-landing.vercel.app/en/about",
  },
  {
    key: "client",
    label: "Explore as a client",
    url: "https://tabi-landing.vercel.app/en",
  },
  {
    key: "sign-in",
    label: "Sign in",
  },
  {
    key: "sign-up",
    label: "Sign up",
  },
  {
    key: "sign-up/step-1",
    label: "Sign up step 1",
  },
  {
    key: "sign-up/step-2",
    label: "Sign up step 2",
  },
  {
    key: "sign-up/step-3",
    label: "Sign up step 3",
  },
  {
    key: "sign-up/step-4",
    label: "Sign up step 4",
  },
];

export const DEFAULT_LANDING_KEY = "sign-in";
export const LANDING_ROUTES = LandingItems.map((item) => item.key);
