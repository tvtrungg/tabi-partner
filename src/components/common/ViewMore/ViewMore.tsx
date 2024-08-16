import { FormattedMessage } from "@umijs/max";
import { IoIosArrowForward } from "react-icons/io";

type TViewMoreProps = {
  setShowModal: (value: boolean) => void;
};

function ViewMore({ setShowModal }: TViewMoreProps) {
  return (
    <span
      className="flex hover:cursor-pointer hover:text-primary-dominant-light text-primary-dominant items-center float-right ml-5"
      onClick={() => setShowModal(true)}
    >
      <FormattedMessage id="pages.createRoom.collapse.viewMore" />
      <IoIosArrowForward className="mt-1 text-base" />
    </span>
  );
}

export default ViewMore;
