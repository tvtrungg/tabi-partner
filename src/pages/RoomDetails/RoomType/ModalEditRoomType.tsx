import FacilityTags from "@/components/core/FacilityTags";
import { useUpdateRoomTypeOfRoom } from "@/services/room/services";
import { useGetRoomTypeForBM } from "@/services/roomType/services";
import { getTimeHourAndMinute } from "@/utils/common";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "@umijs/max";
import { Col, Form, Modal, Row, Select, Spin, message } from "antd";
import { useState } from "react";

type TModalEditRoomTypeProps = {
  id: number;
  data: TRoomTypeBM;
  editRoomType: boolean;
  setEditRoomType: (value: boolean) => void;
  isVN: boolean;
  refetch: () => void;
};

function ModalEditRoomType({
  id,
  data,
  editRoomType,
  setEditRoomType,
  isVN,
  refetch,
}: TModalEditRoomTypeProps) {
  const [form] = Form.useForm<TRoomTypeBM>();
  const [selectedRoomType, setSelectedRoomType] =
    useState<TRoomTypeBM | null>();

  const intl = useIntl();

  const { data: dataRoomTypes, isFetching } = useGetRoomTypeForBM();

  const { mutate } = useUpdateRoomTypeOfRoom(id);
  return (
    <Modal
      forceRender
      title={<FormattedMessage id="pages.room_details.room_type_info.title" />}
      open={editRoomType}
      okText={<FormattedMessage id="roomType.editRoomTypeForm.buttonOk" />}
      closeIcon={true}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            mutate(values, {
              onSuccess: () => {
                refetch();
                setEditRoomType(false);
                message.success(
                  intl.formatMessage({
                    id: "pages.room_details.room_type_info.edit_success",
                  })
                );
                form.resetFields();
              },
            });
          })
          .catch(() => {});
      }}
      onCancel={() => {
        setEditRoomType(false);
        form.resetFields();
      }}
      width={600}
      className="link-room-type-form-content"
    >
      <Form
        form={form}
        name="formRoomTypeOfRoom"
        className="w-full min-h-[50px] max-h-[450px] overflow-y-scroll flex flex-col items-center"
        initialValues={{
          room_type_id: data.id,
        }}
      >
        {isFetching ? (
          <Spin />
        ) : (
          <Form.Item
            label={
              <FormattedMessage id="pages.room_details.room_type_info.type_name.label" />
            }
            name="room_type_id"
            className="w-full mt-2 create-room-form"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.room_details.room_type_info.type_name.required",
                }),
              },
            ]}
          >
            <Select
              options={
                dataRoomTypes?.data?.map((option) => ({
                  value: option.id,
                  label: option.type_name,
                })) || []
              }
              showSearch
              onChange={(value) => {
                setSelectedRoomType(
                  dataRoomTypes?.data.find((option) => option.id === value)
                );
              }}
              placeholder={intl.formatMessage({
                id: "pages.room_details.room_type_info.type_name.placeholder",
              })}
            />
          </Form.Item>
        )}
        {selectedRoomType !== null && selectedRoomType !== undefined && (
          <Row className="w-full mt-4 ml-auto">
            <Col span={8}>
              <h3 className="font-normal mb-4 text-sm">
                <FormattedMessage id="roomType.linkForm.checkinTime.label" />
                {" :"}
              </h3>
              <h3 className="font-normal mb-4 text-sm">
                <FormattedMessage id="roomType.linkForm.checkoutTime.label" />
                {" :"}
              </h3>
              <h3 className="font-normal mb-4 text-sm">
                <FormattedMessage id="roomType.linkForm.includeBreakfast.label" />
                {" :"}
              </h3>
              <h3 className="flex items-center font-normal mb-4 text-sm gap-2">
                <FormattedMessage id="roomType.linkForm.roomFacilities.label" />
                {" :"}
              </h3>
            </Col>
            <Col span={16}>
              <h3 className="mb-4 font-light text-sm hover:text-slate-500">
                {getTimeHourAndMinute(selectedRoomType.check_in_time)}
              </h3>
              <h3 className="mb-4 font-light text-sm hover:text-slate-500">
                {getTimeHourAndMinute(selectedRoomType.check_out_time)}
              </h3>
              <h3 className="mb-4 font-light text-sm hover:text-slate-500">
                {selectedRoomType.include_breakfast ? (
                  <>
                    <FormattedMessage id="roomType.table.includeBreakfastValue.included" />{" "}
                    <CheckCircleOutlined className="ml-2 text-color-success" />
                  </>
                ) : (
                  <>
                    <FormattedMessage id="roomType.table.includeBreakfastValue.notIncluded" />
                    <CloseCircleOutlined className="ml-2 text-color-error" />
                  </>
                )}
              </h3>
              <FacilityTags
                data={selectedRoomType.facilities}
                isVN={isVN}
                display_quantity={20}
              />
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
}

export default ModalEditRoomType;
