import { FormattedMessage, getLocale, useIntl, useNavigate } from "@umijs/max";
import _get from "lodash/get";
import {
  Button,
  Col,
  Divider,
  Empty,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from "antd";
import { useGetRoomTypeForBM } from "@/services/roomType/services";
import { useEffect, useState } from "react";
import { getLocaleParams, getTimeHourAndMinute } from "@/utils/common";
import { useGetBedType } from "@/services/generalType/services";
import { useCreationRoom } from "@/hooks/useCreateRoom";
import CollapseInfo from "@/components/core/CollapseInfo";
import FacilityTags from "@/components/core/FacilityTags";
import { VI_LOCALE } from "@/constants/locale";
import { ROOM_TYPES } from "@/constants/link";
import { RiArrowGoBackFill } from "react-icons/ri";

interface IInformationStepProps {
  form: FormInstance<TCreationRoom>;
}

const getRoomTypeOptions = (roomTypes: TRoomTypeBM[]) => {
  return roomTypes.map((roomType) => ({
    label: roomType.type_name,
    value: roomType.id,
  }));
};

const getBedTypeOptions = (bedTypes: TBedTypeResponse[]) => {
  return bedTypes.map((bedType) => ({
    label: bedType.label,
    value: bedType.id,
  }));
};

const getRoomTypeData = (roomTypes: TRoomTypeBM[], roomTypeID: number) => {
  return roomTypes.find((roomType) => roomType.id === roomTypeID);
};

function InformationStep({ form }: IInformationStepProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const { data } = useGetRoomTypeForBM();
  const roomTypes = _get(data, "data", [] as TRoomTypeBM[]);
  const [roomTypeID, setRoomTypeID] = useState<number>(0);
  const currentRoomType = getRoomTypeData(roomTypes, roomTypeID);
  const locale = getLocale();
  const isVN = locale === VI_LOCALE;

  const { data: bedTypeData } = useGetBedType(getLocaleParams(locale));
  const bedTypes = _get(bedTypeData, "data", [] as TBedTypeResponse[]);
  const snap = useCreationRoom();
  useEffect(() => {
    setRoomTypeID(snap.room_type_id);
  }, []);

  return (
    <>
      <Form.Item
        name="room_type_id"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createRoom.form.required",
            }),
          },
        ]}
        label={intl.formatMessage({
          id: "pages.createRoom.form.roomTypeLabel",
        })}
      >
        <Select
          placeholder={intl.formatMessage({
            id: "pages.createRoom.form.roomTypePlaceholder",
          })}
          options={getRoomTypeOptions(roomTypes)}
          value={roomTypeID}
          onChange={(value) => setRoomTypeID(value)}
          notFoundContent={
            <div className="flex flex-col justify-center">
              <Empty
                className="mb-0"
                description={false}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
              <p className="text-slate-400 w-3/5 mx-auto text-center">
                <FormattedMessage id="pages.createRoom.note.note_roomType" />
              </p>
              <Button
                className="w-2/5 mx-auto my-4 flex items-center justify-center"
                type="primary"
                onClick={() => {
                  navigate(ROOM_TYPES);
                }}
              >
                <RiArrowGoBackFill className="mr-2" />
                <FormattedMessage id="pages.createRoom.form.moveToRoomType" />
              </Button>
            </div>
          }
        />
      </Form.Item>

      <CollapseInfo isActive={!!currentRoomType}>
        <div className="overflow-hidden rounded-lg mb-2">
          <div className="pt-2  pl-[10px] h-full">
            <div className="flex justify-between mb-2">
              <label className="mr-2 font-medium">
                <FormattedMessage id="pages.createRoom.collapse.checkInTimeLabel" />
              </label>
              <span className="w-[70%]">
                {getTimeHourAndMinute(currentRoomType?.check_in_time as string)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <label className="mr-2 font-medium">
                {" "}
                <FormattedMessage id="pages.createRoom.collapse.checkOutTimeLabel" />
              </label>
              <span className="w-[70%]">
                {getTimeHourAndMinute(
                  currentRoomType?.check_out_time as string
                )}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <label className="mr-2 font-medium">
                <FormattedMessage id="pages.createRoom.collapse.includeBreakfastLabel" />
              </label>
              <span className="w-[70%]">
                {currentRoomType?.include_breakfast ? (
                  <FormattedMessage id="yes" />
                ) : (
                  <FormattedMessage id="no" />
                )}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <label className="mr-2 font-medium">
                {" "}
                <FormattedMessage id="pages.createRoom.collapse.facilityLabel" />
              </label>
              <div className="w-[70%]">
                <FacilityTags
                  data={currentRoomType?.facilities || []}
                  isVN={isVN}
                  display_quantity={20}
                />
              </div>
            </div>
          </div>
        </div>
      </CollapseInfo>
      <Form.Item
        name="room_name"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createRoom.form.required",
            }),
          },
        ]}
        label={intl.formatMessage({
          id: "pages.createRoom.form.roomNameLabel",
        })}
      >
        <Input
          placeholder={intl.formatMessage({
            id: "pages.createRoom.form.roomNamePlaceholder",
          })}
          className="px-2 py-1"
        />
      </Form.Item>
      <Form.Item
        name="max_occupancy"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createRoom.form.required",
            }),
          },
        ]}
        label={intl.formatMessage({
          id: "pages.createRoom.form.maxOccupancyLabel",
        })}
      >
        <Input
          type="number"
          min={1}
          placeholder="1"
          suffix={intl.formatMessage({
            id: "pages.createRoom.form.suffixMaxOccupancy",
          })}
          className="px-2 py-1"
          value={form.getFieldValue("max_occupancy")}
          onChange={(event) => {
            const value = event.target.value;
            form.setFieldsValue({
              max_occupancy: Number(value.replace(/\D/g, "")),
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name="quantity"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "pages.createRoom.form.required",
            }),
          },
        ]}
        label={intl.formatMessage({
          id: "pages.createRoom.form.quantityLabel",
        })}
      >
        <Input
          type="number"
          placeholder="1"
          min={1}
          className="px-2 py-1"
          value={form.getFieldValue("quantity")}
          onChange={(event) => {
            const value = event.target.value;
            form.setFieldsValue({
              quantity: Number(value.replace(/\D/g, "")),
            });
          }}
        />
      </Form.Item>
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
            id: "pages.createRoom.form.bedTypePlaceholder",
          })}
          options={getBedTypeOptions(bedTypes)}
        />
      </Form.Item>
      <Divider type="horizontal" orientation="left">
        <FormattedMessage id="pages.createRoom.divider.roomSize" />
      </Divider>
      <Row justify="space-between" gutter={24}>
        <Col span={12}>
          <Form.Item
            name="width"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createRoom.form.required",
                }),
              },
            ]}
            label={intl.formatMessage({
              id: "pages.createRoom.form.widthLabel",
            })}
          >
            <Input
              type="number"
              min={1}
              placeholder="1"
              className="px-2 py-1"
              suffix={intl.formatMessage({
                id: "pages.createRoom.form.suffixMeter",
              })}
              value={form.getFieldValue("width")}
              onChange={(event) => {
                const value = event.target.value;
                form.setFieldsValue({
                  width: Number(value.replace(/\D/g, "")),
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="length"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createRoom.form.required",
                }),
              },
            ]}
            label={intl.formatMessage({
              id: "pages.createRoom.form.lengthLabel",
            })}
          >
            <Input
              type="number"
              min={1}
              placeholder="1"
              className="px-2 py-1"
              suffix={intl.formatMessage({
                id: "pages.createRoom.form.suffixMeter",
              })}
              value={form.getFieldValue("length")}
              onChange={(event) => {
                const value = event.target.value;
                form.setFieldsValue({
                  length: Number(value.replace(/\D/g, "")),
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default InformationStep;
