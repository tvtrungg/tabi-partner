import locations from "@/constants/locations";
import { FormattedMessage, useIntl } from "@umijs/max";
import { Form, FormInstance, Select } from "antd";
import { useEffect, useState } from "react";

type TLocation = {
  codename: string;
  name: string;
  wards?: TLocation[];
};

const getProvinces = () => {
  return locations.map((location) => {
    return {
      value: location.name,
      label: location.name,
    };
  });
};

const findDistricts = (province: string) => {
  const location = locations.find((location) => location.name === province);
  return location?.districts as TLocation[];
};

const getDistricts = (districts: TLocation[]) => {
  return districts.map((district) => {
    return {
      value: district.name,
      label: district.name,
    };
  });
};

const findWards = (districts: TLocation[], districtName: string) => {
  const district = districts.find((district) => district.name === districtName);
  return district?.wards as TLocation[];
};

const getWards = (wards: TLocation[]) => {
  return wards.map((ward) => {
    return {
      value: ward.name,
      label: ward.name,
    };
  });
};

interface ILocationSelectProps {
  form: FormInstance<any>;
}

function LocationSelect({ form }: ILocationSelectProps) {
  const intl = useIntl();
  const [districts, setDistricts] = useState<TLocation[]>([]);
  const [wards, setWards] = useState<TLocation[]>([]);

  useEffect(() => {
    if (!form.getFieldValue("province_city")) {
      return;
    }

    const districtsInit = findDistricts(form.getFieldValue("province_city"));
    setDistricts(districtsInit);
    setWards(findWards(districtsInit, form.getFieldValue("district")));
  }, [form]);

  return (
    <div>
      <Form.Item
        name="province_city"
        label={<FormattedMessage id="pages.createBranch.form.province-city" />}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.province-city.required",
            }),
          },
        ]}
      >
        <Select
          options={getProvinces()}
          showSearch
          onChange={(value) => {
            setDistricts(findDistricts(value));
            form.setFieldsValue({
              district: undefined,
              ward: undefined,
            });
          }}
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.province-city.placeholder",
          })}
        />
      </Form.Item>
      <Form.Item
        name="district"
        label={<FormattedMessage id="pages.createBranch.form.district" />}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.district.required",
            }),
          },
        ]}
      >
        <Select
          options={getDistricts(districts)}
          showSearch
          onChange={(value) => {
            setWards(findWards(districts, value));
            form.setFieldsValue({
              ward: undefined,
            });
          }}
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.district.placeholder",
          })}
        />
      </Form.Item>
      <Form.Item
        name="ward"
        label={<FormattedMessage id="pages.createBranch.form.ward" />}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createBranch.form.ward.required",
            }),
          },
        ]}
      >
        <Select
          options={getWards(wards)}
          showSearch
          placeholder={intl.formatMessage({
            id: "pages.createBranch.form.ward.placeholder",
          })}
        />
      </Form.Item>
    </div>
  );
}

export default LocationSelect;
