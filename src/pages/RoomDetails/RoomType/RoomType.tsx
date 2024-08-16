import FacilityTags from "@/components/core/FacilityTags";
import { getTimeHourAndMinute } from "@/utils/common";
import { Access, FormattedMessage } from "@umijs/max";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ModalEditRoomType from "./ModalEditRoomType";

type TRoomTypeProps = {
  id: number;
  data: TRoomTypeBM;
  isVN: boolean;
  access: {
    isRP: boolean;
    isBM: boolean;
    isHST: boolean;
  };
  refetch: () => void;
};

function RoomType({ id, data, isVN, access, refetch }: TRoomTypeProps) {
  const [editRoomType, setEditRoomType] = useState<boolean>(false);
  return (
    <div className="box-custom">
      <div className="flex justify-between items-start mb-0">
        <div className="flex items-start mb-3 gap-2">
          <h1 className="text-lg font-bold mb-0">
            <FormattedMessage id="pages.room_details.room_type" />
          </h1>
          <h2 className="font-normal text-lg capitalize text-primary-dominant mb-0">
            ({data.type_name})
          </h2>
        </div>
        <Access accessible={access.isBM || access.isHST}>
          <button
            type="button"
            onClick={() => setEditRoomType(true)}
            className="h-8 w-8 bg-transparent hover:text-primary-dominant-light cursor-pointer border-none"
          >
            <FiEdit className="text-xl" />
          </button>
        </Access>
      </div>
      <div className="flex items-center gap-16 mb-2">
        <div>
          <h2 className="text-sm font-semibold">
            <FormattedMessage id="pages.room_details.check_in_time" />
          </h2>
          <h3 className="text-sm font-light">
            {getTimeHourAndMinute(data.check_in_time)}
          </h3>
        </div>
        <div>
          <h2 className="text-sm font-semibold">
            <FormattedMessage id="pages.room_details.check_out_time" />
          </h2>
          <h3 className="text-sm font-light">
            {getTimeHourAndMinute(data.check_out_time)}
          </h3>
        </div>
        <div>
          <h2 className="text-sm font-semibold">
            <FormattedMessage id="pages.room_details.include_breakfast" />
          </h2>
          <h3 className="text-sm font-light">
            {data.include_breakfast ? (
              <FormattedMessage id="yes" />
            ) : (
              <FormattedMessage id="no" />
            )}
          </h3>
        </div>
      </div>
      <FacilityTags data={data.facilities} isVN={isVN} display_quantity={7} />
      <Access accessible={access.isBM || access.isHST}>
        <ModalEditRoomType
          id={id}
          data={data}
          isVN={isVN}
          refetch={refetch}
          editRoomType={editRoomType}
          setEditRoomType={setEditRoomType}
        />
      </Access>
    </div>
  );
}

export default RoomType;
