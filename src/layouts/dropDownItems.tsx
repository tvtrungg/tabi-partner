import { SIGN_IN } from "@/constants/link";
import { keyLocalStorage, removeKey } from "@/utils/local_storage";
import { FormattedMessage } from "@umijs/max";
import { Button, type MenuProps } from "antd";
import { IoIosLogOut } from "react-icons/io";
export const AccountDropdown: MenuProps["items"] = [
  // {
  //   key: "profile",
  //   label: (
  //     <Link to="/profile">
  //       <FormattedMessage id="account_dropdown.subItem.subItem1" />
  //     </Link>
  //   ),
  // },
  // {
  //   key: "settings",
  //   label: (
  //     <Link to="/settings">
  //       <FormattedMessage id="account_dropdown.subItem.subItem2" />
  //     </Link>
  //   ),
  // },
  // {
  //   type: "divider",
  // },
  {
    key: "",
    label: (
      <Button
        onClick={() => {
          removeKey(keyLocalStorage.HASH_AUTH);
          window.location.href = SIGN_IN;
        }}
        className="w-full flex justify-between items-center border-none bg-transparent text-start p-0 m-0"
      >
        <FormattedMessage id="account_dropdown.subItem.subItem3" />
        <IoIosLogOut className="ml-5 text-xl" />
      </Button>
    ),
  },
];
