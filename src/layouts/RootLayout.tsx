import {
  Access,
  FormattedMessage,
  Helmet,
  Outlet,
  SelectLang,
  useAccess,
  useLocation,
  useModel,
  useNavigate,
} from "@umijs/max";
import { MenuInfo } from "rc-menu/lib/interface";
import { Layout, Menu, Dropdown, Space, Button } from "antd";
import { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { getRootPath } from "@/utils/common";
import AuthLayout from "./AuthLayout";
import { BMitems, DEFAULT_KEY_BM, DEFAULT_KEY_RP, RPitems } from "./menuItems";
import { AccountDropdown } from "./dropDownItems";
import { useBackground } from "@/hooks/useTransparentBackground";
import "./style.less";
import { decryptToken } from "@/utils/crypter";
import { keyLocalStorage } from "@/utils/local_storage";
import { BOOKINGS, COMPANY, SIGN_IN } from "@/constants/link";

const { Header, Content, Sider } = Layout;

const WIDTH_SIDE_BAR = 280;
const WIDTH_SIDE_BAR_COLLAPSED = 80;

function RootLayout() {
  const tokens = decryptToken();
  const access = useAccess();
  const navigate = useNavigate();
  const DEFAULT_KEY = access.isBM ? DEFAULT_KEY_BM : DEFAULT_KEY_RP;
  if (!tokens || !tokens[keyLocalStorage.TOKEN]) {
    window.location.href = SIGN_IN;
  }

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentKey = getRootPath(location.pathname);
  const { initialState } = useModel("@@initialState");
  const user = initialState as TMeResponse;

  useEffect(() => {
    if (window.innerWidth < 1300) {
      setCollapsed(true);
    }

    if (access.isRP && currentKey === "") {
      navigate(COMPANY);
    } else if (
      (access.isBM && currentKey === "") ||
      (access.isHST && currentKey === "")
    ) {
      navigate(BOOKINGS);
    }
  }, []);

  const getMenuItems = () => {
    if (access.isBM) {
      return BMitems;
    } else if (access.isHST) {
      return BMitems;
    } else if (access.isRP) {
      return RPitems;
    } else {
      return [];
    }
  };

  const bgSnapshot = useBackground();

  return (
    <div className="w-screen min-h-screen">
      <Helmet>
        <title>Tabi partner</title>
        <meta property="og:title" content="Tabi partner" />

        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />

        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <AuthLayout>
        <Layout hasSider className="h-full w-full">
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={WIDTH_SIDE_BAR}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="light"
              mode="vertical"
              items={getMenuItems()}
              className="fixed top-0 left-0 z-50 pt-4 text-base"
              style={{
                width: collapsed ? WIDTH_SIDE_BAR_COLLAPSED : WIDTH_SIDE_BAR,
                borderInlineEnd: 0,
              }}
              selectedKeys={[currentKey]}
              defaultSelectedKeys={[currentKey || DEFAULT_KEY]}
              onClick={(navItem: MenuInfo) => {
                navigate(`/${navItem.key}`);
              }}
            />
            <div className="sticky top-3 z-50 w-full">
              <Button
                type="text"
                icon={collapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
                className="absolute top-16 -right-3 z-50 flex justify-center items-center rounded-full bg-white shadow-md hover:!bg-slate-100"
              />
            </div>
          </Sider>
          <Layout className="h-full w-full">
            <Header
              className="bg-transparent z-40 mt-4 fixed w-full top-0 px-4 right-0 transition-all duration-200 before:content-[''] before:w-[99%] before:absolute before:-top-6 before:left-0 before:bottom-0 before:z-[-10] before:bg-[#f5f5f5]"
              style={{
                paddingLeft: collapsed
                  ? WIDTH_SIDE_BAR_COLLAPSED + 16
                  : WIDTH_SIDE_BAR + 16,
              }}
            >
              <div className="rounded-lg h-full shadow-md px-4 bg-white text-end">
                <Space size="middle">
                  <SelectLang
                    style={{
                      padding: 0,
                      verticalAlign: "baseline",
                      fontSize: "1.5rem",
                      lineHeight: "2rem",
                    }}
                    className="hover:text-slate-500"
                  />
                  <Dropdown
                    menu={{ items: AccountDropdown }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space
                        align="center"
                        className="text-black hover:text-slate-500"
                      >
                        <div className="flex justify-start items-center">
                          <Access accessible={access.isBM}>
                            <img src="/bm.svg" width={44} height={44} />
                          </Access>
                          <Access accessible={access.isHST}>
                            <img src="/hst.svg" width={44} height={44} />
                          </Access>
                          <Access accessible={access.isRP}>
                            <img src="/rp.svg" width={44} height={44} />
                          </Access>
                          <div className="ml-2">
                            <p className="text-lg text-start m-0 mb-2 leading-none font-semibold">
                              {user.name}
                            </p>
                            <p className="m-0 leading-none text-start">
                              <FormattedMessage
                                id={`account_dropdown.role.${user.role}`}
                              />
                            </p>
                          </div>
                        </div>
                        <AiFillCaretDown />
                      </Space>
                    </a>
                  </Dropdown>
                </Space>
              </div>
            </Header>
            <Content
              className={`rounded-lg mb-4 mx-4 mt-[92px] ${
                bgSnapshot.isTransparent ? "bg-transparent" : "bg-card"
              }`}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </AuthLayout>
    </div>
  );
}

export default RootLayout;
