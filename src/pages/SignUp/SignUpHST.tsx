import { FormattedMessage, getLocale, useIntl, useNavigate } from "@umijs/max";
import { getLocaleParams } from "@/utils/common";
import { useGetAccommodationType } from "@/services/generalType/services";
import _get from "lodash/get";
import { useGetMainFacilities } from "@/services/facility/services";
import { Button, Form, message, Steps, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { usePostBatchFilePresigned } from "@/services/file/services";
import { convertToBatchFileRequest, uploadS3 } from "@/services/file/utils";
import { fileQueryField } from "@/constants/fileQueryField";
import { saveToken, usePostSignUpHST } from "@/services/auth/services";
import AccommodationType from "../CreateBranch/components/AccommodationType";
import FormBranchInfo from "../CreateBranch/components/FormBranchInfo";
import BranchFacility from "../CreateBranch/components/BranchFacility";
import UploadBranchImage from "../CreateBranch/components/UploadBranchImage";
import { SIGN_UP } from "@/constants/link";
import Step1Fields from "./StepContents/Step1Content/Step1Fields";
import {
  clearCreationHost,
  setCreationHost,
  useCreationHost,
} from "@/hooks/useCreateHost";
import cloneDeep from "lodash/cloneDeep";

const formFields = [
  "username",
  "password",
  "reenterPassword",
  "phone",
  "paypal_support",
  "email",
  "full_name",
  "branch_name",
  "address",
  "province_city",
  "district",
  "ward",
  "tax_number",
  "website_url",
  "description",
  "reception_area",
  "main_facilities",
  "type_id",
  "cancellation_time_unit",
  "cancellation_time_value",
  "general_policy",
];

function SignUpHST() {
  const locale = getLocale();
  const intl = useIntl();
  const navigate = useNavigate();
  // get accommodation type list
  const typeResp = useGetAccommodationType(getLocaleParams(locale));
  const accommodationTypeList = _get(typeResp, "data.data", []);
  const accommodationTypeLoading = _get(typeResp, "isLoading", false);

  // get main facility list
  const facilityResp = useGetMainFacilities(getLocaleParams(locale));
  const mainFacilityList = _get(facilityResp, "data.data", []);
  const mainFacilityLoading = _get(facilityResp, "isLoading", false);

  // file
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const fileMutation = usePostBatchFilePresigned();

  const onSuccess = (resp: TSignUpHSTResponse) => {
    const creation = convertToBatchFileRequest(files, {
      attachment_id: resp.branch_id,
      attachment_type: fileQueryField.branch.attachmentType,
      field: fileQueryField.branch.field.thumbnail,
    });
    fileMutation.mutate(creation, {
      onSuccess: (fileResp) => {
        uploadS3(fileResp, files).then(() => {
          saveToken(resp.access_token, resp.refresh_token);
          message.success(
            intl.formatMessage({
              id: "pages.createBranch.message.createBranch.success",
            })
          );
          clearCreationHost();
        });
      },
    });
  };
  const { mutate, isLoading } = usePostSignUpHST(onSuccess);

  //form
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<TSignUpHSTRequest>();
  const host_info = useCreationHost();

  useEffect(() => {
    form.setFieldsValue(cloneDeep(host_info) as TSignUpHSTRequest);
  }, [form]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: <FormattedMessage id="signUp.steps.step1.label" />,
      content: (
        <div className="sign-up-form-content w-full h-full flex flex-col items-center justify-start">
          <Step1Fields paypal_support={host_info.paypal_support} />
        </div>
      ),
    },
    {
      title: <FormattedMessage id="pages.createBranch.step-1.title" />,
      content: (
        <AccommodationType
          form={form}
          accommodationTypeList={accommodationTypeList}
          isLoading={accommodationTypeLoading}
        />
      ),
    },
    {
      title: <FormattedMessage id="pages.createBranch.step-2.title" />,
      content: <FormBranchInfo form={form} displayTaxNumber />,
    },
    {
      title: <FormattedMessage id="pages.createBranch.step-3.title" />,
      content: (
        <BranchFacility
          form={form}
          mainFacilityList={mainFacilityList}
          isLoading={mainFacilityLoading}
        />
      ),
    },
    {
      title: <FormattedMessage id="pages.createBranch.step-4.title" />,
      content: (
        <UploadBranchImage form={form} files={files} setFiles={setFiles} />
      ),
    },
  ];

  return (
    <>
      <Steps className="ant-steps-tracking" current={current} items={steps} />
      <Form
        form={form}
        className=" w-full h-full pl-2 py-2 pr-1 overflow-y-auto"
      >
        <div className="mt-5">{steps[current].content}</div>
        <div className="flex flex-row justify-center mt-5 mb-2">
          <Button
            className="w-[100px] px-4 me-5"
            size="large"
            onClick={() => (current === 0 ? navigate(SIGN_UP) : prev())}
          >
            <FormattedMessage id="pages.createBranch.button.back" />
          </Button>
          <Button
            type="primary"
            className="w-[100px] px-4"
            size="large"
            loading={isLoading}
            onClick={() => {
              form
                .validateFields()
                .then((value) => {
                  if (current !== steps.length - 1) {
                    if (value.paypal_support === false) {
                      form.setFieldValue("email", "");
                    }
                    setCreationHost(value);
                    next();
                  } else {
                    if (files.length === 0) {
                      message.error(
                        intl.formatMessage({
                          id: "pages.createBranch.message.createBranch.image",
                        })
                      );
                      return;
                    }
                    const values = form.getFieldsValue(formFields);
                    mutate(values);
                  }
                })
                .catch(() => {});
            }}
          >
            {current === steps.length - 1 ? (
              <FormattedMessage id="pages.createBranch.button.submit" />
            ) : (
              <FormattedMessage id="pages.createBranch.button.next" />
            )}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default SignUpHST;
