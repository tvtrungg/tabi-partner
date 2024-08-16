type TMenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TMenuItem[];
};

type TLandingItem = {
  key: string;
  label: React.ReactNode;
  children?: TLandingItem[];
  url?: string;
};
