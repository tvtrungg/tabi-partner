import { FormattedMessage } from "@umijs/max";
import FacilityTags from "@/components/core/FacilityTags";
import { VI_LOCALE } from "@/constants/locale";

type TFacilities = {
  data: TBranchDetails;
  locale: string;
};

function Facilities({ data, locale }: TFacilities) {
  const isVN = locale === VI_LOCALE;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl mb-0 font-bold">
          <FormattedMessage id="pages.branch_details.main_facilities" />
        </h1>
      </div>
      <FacilityTags
        data={data.main_facilities}
        isVN={isVN}
        display_quantity={20}
      />
    </>
  );
}

export default Facilities;
