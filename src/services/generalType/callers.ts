// import { request } from "@umijs/max";
// import { ACCOMMODATION_PATH, BED_TYPE_PATH } from "./paths";
import data from "./generalTypes.json";

const getGeneralTypeData = async (type: string, locale: string) => {
  let response = {
    data: [] as any[],
  };

  const filteredData = data.filter((item) => item.class.includes(type));

  if (type === "ACCOMMODATION") {
    const parents = filteredData.filter((item) => item.order === 1);
    response.data = parents.map((parent) => {
      return {
        id: parent.id,
        label: locale === "vi" ? parent.label_vi : parent.label_en,
        description: locale === "vi" ? parent.desc_vi : parent.desc_en,
        children: filteredData
          .filter((child) => child.order === 2 && child.class === parent.class)
          .map((child) => ({
            id: child.id,
            label: locale === "vi" ? child.label_vi : child.label_en,
            description: locale === "vi" ? child.desc_vi : child.desc_en,
          })),
      };
    });
  }

  if (type === "BED") {
    response.data = filteredData.map((item) => ({
      id: item.id,
      label: locale === "vi" ? item.label_vi : item.label_en,
      description: locale === "vi" ? item.desc_vi : item.desc_en,
    }));
  }

  return response;
};

export const getAccommodationType = async (locale: string) => {
  // return request(`${ACCOMMODATION_PATH}/${locale}`, {
  //   method: "GET",
  // });
  return getGeneralTypeData("ACCOMMODATION", locale);
};

export const getBedType = async (locale: string) => {
  // return request(`${BED_TYPE_PATH}/${locale}`, {
  //   method: "GET",
  // });

  return getGeneralTypeData("BED", locale);
};
