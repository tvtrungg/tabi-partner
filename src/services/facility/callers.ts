import facilities from "./facilities.json";

const readData = async (type: string, lang: string) => {
  const response = {
    data: [] as TFacilityResponse[],
  };

  const facilityMap = new Map<string, TFacilityModel[]>();
  facilities.forEach((item) => {
    if (item.type !== type) {
      return;
    }
    const vals = facilityMap.get(item.class_en) || [];

    if (!vals.includes(item)) {
      vals.push(item);
      facilityMap.set(item.class_en, vals);
    }
  });

  facilityMap.forEach((value, key) => {
    if (lang === "vi") {
      response.data.push({
        class: value[0].class_vi,
        items: value.map((item) => {
          return {
            id: item.id,
            name: item.name_vi,
          };
        }),
      });
    } else {
      response.data.push({
        class: key,
        items: value.map((item) => {
          return {
            id: item.id,
            name: item.name_en,
          };
        }),
      });
    }
  });

  return response;
};

export const getMainFacility = async (locale: string) => {
  return readData("MAIN", locale);
};

export const getRoomFacility = async (locale: string) => {
  return readData("ROOM", locale);
};
