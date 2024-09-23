import {
  useParams,
  getLocale,
  FormattedMessage,
  useIntl,
  useModel,
} from "@umijs/max";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  Switch,
  Spin,
  message,
  Select,
} from "antd";
import { FaPlus } from "react-icons/fa6";
import RoomTypeFacilities from "./RoomTypeFacilities";
import _get from "lodash/get";
import { cloneDeep } from "lodash";
import { useState, useEffect } from "react";
import { FORMAT, PAGE_LIMIT } from "@/constants/table";
import { ColumnProperties } from "./columnProperties";

import { formattedTimeMutate, getLocaleParams } from "@/utils/common";
import {
  useGetRoomFacilitiesAddState,
  useGetRoomFacilitiesEditState,
  setRoomFacilitiesEditDialogState,
} from "@/hooks/useRoomFacilities";
import {
  useGetRoomTypeOfBranchByID,
  useAddRoomTypeToBranchByID,
  useUpdateRoomTypeByID,
  useLinkUnlinkRoomTypeFromBranch,
} from "@/services/roomType/services";
import { useGetRoomFacilities } from "@/services/facility/services";
import {
  TRTMDFacilityItem,
  TRoomTypeOfBranch,
  TRoomTypeUpdateRequest,
} from "@/services/roomType/typing";
import { BRANCH_MANAGER } from "@/constants/auth";
import FacilityTags from "@/components/core/FacilityTags";
import "./RoomTypes.less";
import { usePagination } from "@/utils/usePagination";

function RoomTypes() {
  const { initialState } = useModel("@@initialState");
  const role = _get(initialState, "role");
  const place_id = _get(initialState, "place_id", 0);
  const params = useParams();
  let id = role === BRANCH_MANAGER ? place_id : Number(_get(params, "id") || 0);

  const locale = getLocale();
  const isVN = locale === "vi-VN";
  const intl = useIntl();

  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);

  const [widgets, setWidgets] = useState<TRTMDFacilityItem[]>([]);

  const [isOpenCreateRoomTypeModal, setIsOpenCreateRoomTypeModal] =
    useState(false);

  const roomFacilitiesAddState = useGetRoomFacilitiesAddState();
  const { isOpenEditDialog, editForm } = useGetRoomFacilitiesEditState();
  const [filter, setFilter] = useState<{ [key: string]: any }>({});
  const isFilterNotEmpty = Object.keys(filter).length > 0;

  const [form] = Form.useForm<TRoomTypeOfBranch>();
  const [formEdit] = Form.useForm<TRoomTypeOfBranch>();

  useEffect(() => {
    formEdit.setFieldsValue(cloneDeep(editForm) as TRoomTypeUpdateRequest);
  }, [formEdit, editForm]);

  const { currentPage, handlePageChanges } = usePagination();

  const {
    data: dataRoomTypeOfBranch,
    isFetching: isFetchingRoomTypeOfBranch,
    refetch: refetchRoomTypeOfBranch,
  } = useGetRoomTypeOfBranchByID(pageLimit, currentPage, filter);

  const { mutate: mutateAddRoomTypeToBranch } = useAddRoomTypeToBranchByID();
  const { mutate: mutateUpdateRoomTypeInfo } = useUpdateRoomTypeByID();
  const { mutate: mutateLinkUnlinkRoomTypeFromBranch } =
    useLinkUnlinkRoomTypeFromBranch();
  const { data: dataRoomFacilities, isFetching: isFetchingRoomFacilities } =
    useGetRoomFacilities(getLocaleParams(locale));

  const comlunnProps = ColumnProperties(
    intl,
    isFilterNotEmpty,
    filter,
    setFilter,
    Number(id),
    mutateLinkUnlinkRoomTypeFromBranch,
    refetchRoomTypeOfBranch
  );

  return (
    <div className="w-full flex flex-col justify-between items-start mb-2 p-3">
      <div className="w-full flex flex-row justify-between items-center p-2">
        <h1 className="text-xl mb-3 font-bold">
          <FormattedMessage id="roomType.title" />
        </h1>
        <Button
          type="primary"
          className="text-base font-semibold size-8"
          onClick={() => setIsOpenCreateRoomTypeModal(true)}
        >
          <FaPlus />
        </Button>
      </div>
      <Table
        dataSource={dataRoomTypeOfBranch?.data.map((roomType) => ({
          ...roomType,
          key: roomType.id,
        }))}
        columns={comlunnProps}
        expandable={{
          expandedRowRender: (data) => (
            <FacilityTags
              data={data.facilities}
              isVN={isVN}
              display_quantity={20}
            />
          ),
          columnWidth: 35,
        }}
        loading={isFetchingRoomTypeOfBranch}
        pagination={{
          showSizeChanger: false,
          onShowSizeChange: (_, size) => {
            setPageLimit(size);
          },
          current: currentPage,
          total: dataRoomTypeOfBranch?.total,
          onChange: (page) => handlePageChanges(page),
        }}
        scroll={{ x: 800 }}
        className="w-full"
      />
      <Modal
        forceRender
        centered
        title={<FormattedMessage id="roomType.createRoomTypeForm.title" />}
        open={isOpenCreateRoomTypeModal}
        okText={<FormattedMessage id="roomType.createRoomTypeForm.buttonOk" />}
        closeIcon={true}
        onOk={async () => {
          form
            .validateFields()
            .then(async (values) => {
              mutateAddRoomTypeToBranch(
                {
                  ...values,
                  branch_id: Number(id),
                  room_facilities: roomFacilitiesAddState.room_facilities,
                  check_in_time: formattedTimeMutate(values.check_in_time),
                  check_out_time: formattedTimeMutate(values.check_out_time),
                },
                {
                  onSuccess: async () => {
                    message.success(
                      intl.formatMessage({
                        id: "roomType.createRoomTypeForm.messageSuccess",
                      })
                    );
                    setWidgets([]);
                    await refetchRoomTypeOfBranch();
                    form.resetFields();
                    setIsOpenCreateRoomTypeModal(false);
                  },
                }
              );
            })
            .catch((info) => {
              console.log("Validate failed:", info);
            });
        }}
        onCancel={() => {
          setIsOpenCreateRoomTypeModal(false);
        }}
        width={650}
        className="create-room-type-form-content"
      >
        <Form
          form={form}
          name="formCreateRoomType"
          className="w-full min-h-[500px] max-h-[450px] overflow-y-scroll flex flex-col items-center justify-start custom-info-form px-2"
        >
          <div className="w-full">
            <Form.Item
              label={
                <FormattedMessage id="roomType.createRoomTypeForm.roomType.label" />
              }
              name="type_name"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "roomType.createRoomTypeForm.roomType.required",
                  }),
                },
                {
                  min: 4,
                  message: intl.formatMessage({
                    id: "roomType.createRoomTypeForm.roomType.required",
                  }),
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: "roomType.createRoomTypeForm.roomType.placeholder",
                })}
                className="px-2 py-1"
                allowClear
              />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage id="roomType.createRoomTypeForm.checkinTime.label" />
              }
              name="check_in_time"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "roomType.createRoomTypeForm.checkinTime.required",
                  }),
                },
              ]}
            >
              <TimePicker
                format={FORMAT}
                placeholder={intl.formatMessage({
                  id: "roomType.createRoomTypeForm.checkinTime.placeholder",
                })}
                allowClear
                className="w-full px-2 py-1"
              />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage id="roomType.createRoomTypeForm.checkoutTime.label" />
              }
              name="check_out_time"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "roomType.createRoomTypeForm.checkoutTime.required",
                  }),
                },
              ]}
            >
              <TimePicker
                format={FORMAT}
                placeholder={intl.formatMessage({
                  id: "roomType.createRoomTypeForm.checkoutTime.placeholder",
                })}
                allowClear
                className="w-full px-2 py-1"
              />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage id="roomType.createRoomTypeForm.includeBreakfast.label" />
              }
              name="include_breakfast"
              valuePropName="checked"
            >
              <Switch className="w-[44px] h-[22px]" />
            </Form.Item>
          </div>
          {isFetchingRoomFacilities ? (
            <Spin />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <RoomTypeFacilities
                dataRoomFacilities={dataRoomFacilities?.data}
                widgets={widgets}
                setWidgets={setWidgets}
              />
            </div>
          )}
        </Form>
      </Modal>
      <Modal
        forceRender
        centered
        title={<FormattedMessage id="roomType.editRoomTypeForm.title" />}
        open={isOpenEditDialog}
        okText={<FormattedMessage id="roomType.editRoomTypeForm.buttonOk" />}
        closeIcon={true}
        onOk={async () => {
          formEdit
            .validateFields()
            .then(async (values) => {
              let facilities = formEdit.getFieldValue("facilities");
              if (!Number.isInteger(facilities[0])) {
                facilities = facilities.map((item: TFacilityModel) => item.id);
              }
              mutateUpdateRoomTypeInfo(
                {
                  ...values,
                  branch_id: Number(id),
                  id: editForm.id,
                  room_facilities: facilities,
                  check_in_time: formattedTimeMutate(values.check_in_time),
                  check_out_time: formattedTimeMutate(values.check_out_time),
                },
                {
                  onSuccess: async () => {
                    message.success(
                      intl.formatMessage({
                        id: "roomType.editRoomTypeForm.messageSuccess",
                      })
                    );
                    await refetchRoomTypeOfBranch();
                    formEdit.resetFields();
                    setRoomFacilitiesEditDialogState(false);
                  },
                }
              );
            })
            .catch((info) => {
              console.log("Validate failed:", info);
            });
        }}
        onCancel={() => {
          setRoomFacilitiesEditDialogState(false);
        }}
        width={700}
      >
        <Form
          form={formEdit}
          name="formEditRoomType"
          className="w-full custom-info-form mt-5"
        >
          <Form.Item
            label={
              <FormattedMessage id="roomType.editRoomTypeForm.roomType.label" />
            }
            name="type_name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "roomType.editRoomTypeForm.roomType.required",
                }),
              },
              {
                min: 4,
                message: intl.formatMessage({
                  id: "roomType.editRoomTypeForm.roomType.rule",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "roomType.editRoomTypeForm.roomType.placeholder",
              })}
              className="px-2 py-1"
              allowClear
            />
          </Form.Item>
          <Form.Item
            label={
              <FormattedMessage id="roomType.editRoomTypeForm.checkinTime.label" />
            }
            name="check_in_time"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "roomType.editRoomTypeForm.checkinTime.required",
                }),
              },
            ]}
          >
            <TimePicker
              format={FORMAT}
              placeholder={intl.formatMessage({
                id: "roomType.editRoomTypeForm.checkinTime.placeholder",
              })}
              allowClear
              className="w-full px-2 py-1"
            />
          </Form.Item>
          <Form.Item
            label={
              <FormattedMessage id="roomType.createRoomTypeForm.checkoutTime.label" />
            }
            name="check_out_time"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "roomType.editRoomTypeForm.checkoutTime.required",
                }),
              },
            ]}
          >
            <TimePicker
              format={FORMAT}
              placeholder={intl.formatMessage({
                id: "roomType.editRoomTypeForm.checkoutTime.placeholder",
              })}
              allowClear
              className="w-full px-2 py-1"
            />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            label={
              <FormattedMessage id="roomType.editRoomTypeForm.includeBreakfast.label" />
            }
            name="include_breakfast"
          >
            <Switch className="w-[44px] h-[22px] mr-auto" />
          </Form.Item>

          <Form.Item
            label={
              <FormattedMessage id="roomType.editRoomTypeForm.facilities.label" />
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "roomType.editRoomTypeForm.facilities.required",
                }),
              },
            ]}
            name="room_facilities"
          >
            <Select
              mode="multiple"
              showSearch
              placeholder={intl.formatMessage({
                id: "roomType.editRoomTypeForm.facilities.label",
              })}
              optionFilterProp="children"
              onChange={(value) => {
                formEdit.setFieldsValue({ facilities: value });
              }}
            >
              {dataRoomFacilities?.data?.map((group) => (
                <Select.OptGroup
                  key={group.class}
                  label={group.class}
                  allowClear
                  className="text-primary-dominant"
                >
                  {group.items.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default RoomTypes;
