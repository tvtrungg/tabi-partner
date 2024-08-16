import { useGetBedType } from "@/services/generalType/services";
import { getLocaleParams } from "@/utils/common";
import { getLocale, useIntl } from "@umijs/max";
import { Form, Select } from "antd";
import _get from "lodash/get";

const getBedTypeOptions = (bedTypes: TBedTypeResponse[]) => {
  return bedTypes.map((bedType) => ({
    label: bedType.label,
    value: bedType.id,
  }));
};

function BedTypeOptions() {
  const locale = getLocale();
  const intl = useIntl();

  const { data: bedTypeData } = useGetBedType(getLocaleParams(locale));
  const bedTypes = _get(bedTypeData, "data", [] as TBedTypeResponse[]);

  return (
    <Form.Item
      name="bed_type_id"
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: "pages.createRoom.form.required",
          }),
        },
      ]}
      label={intl.formatMessage({
        id: "pages.createRoom.form.bedTypeLabel",
      })}
    >
      <Select
        placeholder={intl.formatMessage({
          id: "pages.createRoom.form.bedTypeLabel",
        })}
        options={getBedTypeOptions(bedTypes)}
      />
    </Form.Item>
  );
}
export default BedTypeOptions;
