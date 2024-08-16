import { ProLayoutProps } from "@ant-design/pro-components";

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "light",
  // 拂晓蓝
  colorPrimary: "#1890ff",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: "Tabi",
  pwa: true,
  logo: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  iconfontUrl: "",
  token: {},
};

export default Settings;
