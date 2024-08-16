import { defineConfig } from "@umijs/max";
import colors from "./colors";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
import routes from "./routes";
import themeProvider from "./themeProvider";

const { REACT_APP_ENV = "dev" } = process.env;

export default defineConfig({
  hash: true,
  routes,
  theme: {
    ...colors,
  },
  tailwindcss: {},
  extraPostCSSPlugins: [require("tailwindcss")],
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: "Tabi",
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: "antd",
    plugins: ["duration"],
  },
  locale: {
    default: "en-US",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  antd: {
    configProvider: {
      theme: {
        token: themeProvider.token,
        components: themeProvider.components,
      },
    },
  },
  request: {},
  access: {
    strictMode: true,
  },
  headScripts: [{ src: "/scripts/loading.js", async: true }],
  presets: ["umi-presets-pro"],
  mfsu: {
    strategy: "normal",
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
  valtio: {},
});
