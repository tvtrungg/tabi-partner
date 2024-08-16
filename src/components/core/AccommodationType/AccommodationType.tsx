import { useGetAccommodationType } from "@/services/generalType/services";
import { getLocaleParams } from "@/utils/common";
import { FormattedMessage, getLocale, useIntl } from "@umijs/max";
import { Form, Select } from "antd";
import _get from "lodash/get";

const getAccommodationTypeOptions = (
  accommodationTypes: TAccommodationTypeResponse[]
) => {
  return accommodationTypes.map((accommodationType) => ({
    title: accommodationType.label,
    label: accommodationType.label,
    options: accommodationType.children.map((child) => ({
      value: child.id,
      label: child.label,
    })),
  }));
};

function AccommodationType() {
  const locale = getLocale();
  const intl = useIntl();

  const typeResp = useGetAccommodationType(getLocaleParams(locale));
  const accommodationTypeList = _get(
    typeResp,
    "data.data",
    [] as TAccommodationTypeResponse[]
  );
  return (
    <Form.Item
      name="type_id"
      label={
        <FormattedMessage id="pages.branch_details.branch_info.type.label" />
      }
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: "pages.branch_details.branch_info.type.required",
          }),
        },
      ]}
    >
      <Select
        placeholder={intl.formatMessage({
          id: "pages.createRoom.form.bedTypeLabel",
        })}
        options={getAccommodationTypeOptions(accommodationTypeList)}
      />
    </Form.Item>
  );
}

export default AccommodationType;
