type TAccommodationTypeResponse = {
  id: number;
  description: string;
  label: string;
  children: TAccommodationChildren[];
};

type TAccommodationChildren = {
  description: string;
  id: number;
  label: string;
};

type TBedTypeResponse = {
  id: number;
  label: string;
};
