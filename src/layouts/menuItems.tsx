import { FormattedMessage } from "@umijs/max";
import { IoIosGitBranch } from "react-icons/io";
import { LuBuilding, LuClipboardList } from "react-icons/lu";
import { BiBed } from "react-icons/bi";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
export const RPitems: TMenuItem[] = [
  {
    key: "company",
    label: <FormattedMessage id="component.sider.company" />,
    icon: <LuBuilding className="mx-2" />,
  },
  {
    key: "branches",
    label: <FormattedMessage id="component.sider.branches" />,
    icon: <IoIosGitBranch className="mx-2" />,
  },
  {
    key: "rooms",
    label: <FormattedMessage id="component.sider.rooms" />,
    icon: <BiBed className="mx-2" />,
  },
];

export const BMitems: TMenuItem[] = [
  {
    key: "branch",
    label: <FormattedMessage id="component.sider.branch" />,
    icon: <LuBuilding className="mx-2" />,
  },
  {
    key: "bookings",
    label: <FormattedMessage id="component.sider.booking" />,
    icon: <LuClipboardList className="mx-2" />,
  },
  {
    key: "room-types",
    label: <FormattedMessage id="component.sider.roomTypes" />,
    icon: <MdOutlineRoomPreferences className="mx-2" />,
  },
  {
    key: "rooms",
    label: <FormattedMessage id="component.sider.rooms" />,
    icon: <LuBedDouble className="mx-2" />,
  },
];
export const DEFAULT_KEY_BM = "bookings";
export const DEFAULT_KEY_RP = "company";
export const RP_ROUTES = RPitems.map((item) => item.key);
export const BM_ROUTES = BMitems.map((item) => item.key);
