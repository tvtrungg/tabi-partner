import {
  FormattedMessage,
  Link,
  useAccess,
  useIntl,
  useNavigate,
} from "@umijs/max";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Row,
  Steps,
  UploadFile,
  message,
} from "antd";
import { usePostRoom } from "@/services/room/services";
import InformationStep from "./components/InformationStep";
import PricingStep from "./components/PricingStep";
import { useEffect, useState } from "react";
import { ROOMS } from "@/constants/link";
import {
  clearCreationRoom,
  setCreationRoom,
  useCreationRoom,
} from "@/hooks/useCreateRoom";
import cloneDeep from "lodash/cloneDeep";
import { formatCurrency, removeComma } from "@/utils/common";
import { formKeys, getCreationRoomRequest } from "@/services/room/utils";
import { convertToBatchFileRequest, uploadS3 } from "@/services/file/utils";
import { fileQueryField } from "@/constants/fileQueryField";
import { usePostBatchFilePresigned } from "@/services/file/services";
import ImageStep from "./components/ImageStep";

function CreateRoom() {
  const access = useAccess();
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm<TCreationRoom>();

  // file
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const fileMutation = usePostBatchFilePresigned((resp) => {
    uploadS3(resp, files);
  });

  // mutation post branch
  const onSuccess = (resp: TRoomResponse) => {
    const creation = convertToBatchFileRequest(files, {
      attachment_id: resp.id,
      attachment_type: fileQueryField.room.attachmentType,
      field: fileQueryField.room.field.gallery,
    });
    fileMutation.mutate(creation);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const snap = useCreationRoom();

  useEffect(() => {
    form.setFieldsValue(cloneDeep(snap) as TCreationRoom);
    if (snap.max_price) {
      form.setFieldsValue({
        max_price: formatCurrency(snap.max_price),
      });
    }
  }, [form]);

  const steps_RP = [
    {
      title: <FormattedMessage id="pages.createRoom.step.info" />,
      content: <InformationStep form={form} />,
    },
    {
      title: <FormattedMessage id="pages.createRoom.step.price" />,
      content: <PricingStep form={form} snapshot={snap} />,
    },
    {
      title: <FormattedMessage id="pages.createRoom.step.image" />,
      content: <ImageStep files={files} setFiles={setFiles} />,
    },
  ];

  const steps_BM = [
    {
      title: <FormattedMessage id="pages.createRoom.step.info" />,
      content: <InformationStep form={form} />,
    },
    {
      title: <FormattedMessage id="pages.createRoom.step.price" />,
      content: <PricingStep form={form} snapshot={snap} />,
    },
  ];

  const steps = access.isBM ? steps_BM : steps_RP;
  let onSuccessCallback;
  if (access.isBM) {
    onSuccessCallback = undefined;
  } else {
    onSuccessCallback = onSuccess;
  }
  const { mutate, isLoading } = usePostRoom(onSuccessCallback);

  return (
    <Form
      form={form}
      className="create-room-form p-4 h-full"
      onValuesChange={(value) => {
        if (value.max_price) {
          value.max_price = removeComma(value.max_price);
        }
        if (value.reservation_reduction) {
          value.reservation_reduction = form.getFieldValue(
            "reservation_reduction"
          );
        }
        setCreationRoom(value);
      }}
    >
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROOMS}>
                <FormattedMessage id="pages.createRoom.breadcrumb.rooms" />
              </Link>
            ),
          },
          {
            title: <FormattedMessage id="pages.createRoom.breadcrumb.create" />,
          },
        ]}
        className="mb-5"
      />
      <Row gutter={16} className="h-full">
        <Col span={6}>
          <Steps
            direction="vertical"
            className="border-solid border-neutral-100 border-0 border-r-2"
            current={currentStep}
            items={steps}
          />
        </Col>
        <Col span={18}>
          <div className="pl-5">{steps[currentStep].content}</div>
        </Col>
      </Row>

      <div className="flex justify-end mt-4">
        <Form.Item>
          {currentStep > 0 && (
            <Button
              className="px-4 mr-2"
              onClick={() => {
                if (currentStep !== 0) {
                  setCurrentStep(currentStep - 1);
                }
              }}
            >
              <FormattedMessage id="pages.createRoom.form.backButton" />
            </Button>
          )}
          <Button
            type="primary"
            className="px-4"
            loading={isLoading}
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  if (currentStep !== steps.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    const req = getCreationRoomRequest(
                      form.getFieldsValue(formKeys)
                    );
                    mutate(req, {
                      onSuccess: () => {
                        message.success(
                          intl.formatMessage({
                            id: "pages.createRoom.success",
                          })
                        );
                        clearCreationRoom();
                        navigate(ROOMS);
                      },
                    });
                  }
                })
                .catch(() => {});
            }}
          >
            {currentStep === steps.length - 1 ? (
              <FormattedMessage id="pages.createRoom.form.submitButton" />
            ) : (
              <FormattedMessage id="pages.createRoom.form.nextButton" />
            )}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default CreateRoom;
