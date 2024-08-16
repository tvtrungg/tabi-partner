type TRoomFacilityResponse = {
  data: TFacilityResponse[];
};

type TFacilityResponse = {
  class: string;
  items: TFacilityItem[];
};

type TFacilityItem = {
  id: number;
  name: string;
};
