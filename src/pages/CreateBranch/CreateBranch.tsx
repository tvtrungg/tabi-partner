import { RP_BRANCHES, SIGN_UP } from "@/constants/link";
import {
  FormattedMessage,
  Link,
  getLocale,
  useAccess,
  useIntl,
  useNavigate,
} from "@umijs/max";
import { Breadcrumb, Button, Form, Steps, UploadFile, message } from "antd";
import { Fragment, useEffect, useState } from "react";
import AccommodationType from "./components/AccommodationType";
import FormBranchInfo from "./components/FormBranchInfo";
import BranchFacility from "./components/BranchFacility";
import { useGetAccommodationType } from "@/services/generalType/services";
import { getLocaleParams } from "@/utils/common";
import _get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import { useGetMainFacilities } from "@/services/facility/services";
import { usePostBranch } from "@/services/branch/services";
import {
  clearCreationBranch,
  setCreationBranch,
  useCreationBranch,
} from "@/hooks/useCreateBranch";
import UploadBranchImage from "./components/UploadBranchImage";
import { convertToBatchFileRequest, uploadS3 } from "@/services/file/utils";
import { fileQueryField } from "@/constants/fileQueryField";
import { usePostBatchFilePresigned } from "@/services/file/services";

const formFields = [
  "branch_name",
  "address",
  "province_city",
  "district",
  "ward",
  "description",
  "reception_area",
  "main_facilities",
  "type_id",
  "cancellation_time_unit",
  "cancellation_time_value",
  "general_policy",
];

function CreateBranch() {
  const locale = getLocale();
  const intl = useIntl();
  const access = useAccess();
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
  const fileMutation = usePostBatchFilePresigned((resp) => {
    uploadS3(resp, files);
  });

  // mutation post branch
  const navigate = useNavigate();

  const onSuccess = (resp: TBranchResponse) => {
    const creation = convertToBatchFileRequest(files, {
      attachment_id: resp.id,
      attachment_type: fileQueryField.branch.attachmentType,
      field: fileQueryField.branch.field.thumbnail,
    });
    fileMutation.mutate(creation, {
      onSuccess: () => {
        message.success(
          intl.formatMessage({
            id: "pages.createBranch.message.createBranch.success",
          })
        );
        clearCreationBranch();
        navigate(RP_BRANCHES);
      },
    });
  };
  const { mutate, isLoading } = usePostBranch(onSuccess);

  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<TCreationBranch>();
  const snap = useCreationBranch();

  useEffect(() => {
    form.setFieldsValue(cloneDeep(snap) as TCreationBranch);
  }, [form]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
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
      content: <FormBranchInfo form={form} />,
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
    <Fragment>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={RP_BRANCHES}>
                <FormattedMessage id="pages.createBranch.breadcrumb.branches" />
              </Link>
            ),
          },
          {
            title: (
              <FormattedMessage id="pages.createBranch.breadcrumb.create" />
            ),
          },
        ]}
      />

      <Steps className="mt-5 px-8" current={current} items={steps} />
      <Form form={form}>
        <div className="mt-5">{steps[current].content}</div>
        <div className="flex flex-row-reverse mt-5">
          <Button
            type="primary"
            className="px-3"
            loading={isLoading}
            onClick={() => {
              form
                .validateFields()
                .then((value) => {
                  if (current !== steps.length - 1) {
                    setCreationBranch(value);
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
          <Button
            className="mr-2 px-3"
            disabled={current === 0 && access.isRP}
            onClick={() =>
              current === 0 && !access.isRP ? navigate(SIGN_UP) : prev()
            }
          >
            <FormattedMessage id="pages.createBranch.button.back" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
}

export default CreateBranch;
