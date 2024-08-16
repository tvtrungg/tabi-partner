import {
  Outlet,
  Access,
  FormattedMessage,
  SelectLang,
  useLocation,
  useNavigate,
  Helmet,
} from "@umijs/max";
import { getLandingPath } from "@/utils/common";
import {
  LANDING_ROUTES,
  LandingItems,
  DEFAULT_LANDING_KEY,
} from "./landingItems";
import NoFoundPage from "@/pages/404";
import LogoWithSlogan from "@/assets/logo/logo-with-slogan.png";
import { Layout, Button, Typography } from "antd";
import colors from "../../config/colors";
import { decryptToken } from "@/utils/crypter";
import { keyLocalStorage } from "@/utils/local_storage";
import { HOME, SIGN_IN, SIGN_UP } from "@/constants/link";

function LandingLayout() {
  const tokens = decryptToken();
  if (tokens && tokens[keyLocalStorage.TOKEN]) {
    window.location.href = HOME;
  }

  const navigate = useNavigate();
  const location = useLocation();

  const getLandingRoutes = () => {
    return LANDING_ROUTES;
  };

  const isLandingAccessible = (path: string) => {
    const landingPath = getLandingPath(path) || DEFAULT_LANDING_KEY;
    return getLandingRoutes().includes(landingPath);
  };

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
      <Access
        accessible={isLandingAccessible(location.pathname)}
        fallback={<NoFoundPage />}
      >
        <Layout className="h-screen w-screen">
          <div className="h-[50px] w-screen bg-white flex justify-start items-center ps-5 gap-5">
            <img className="max-h-[40px]" src={LogoWithSlogan} alt="" />
            <div className="w-full flex justify-between items-center ms-5 me-5">
              <div className="w-full flex justify-start items-center gap-10">
                {LandingItems.map((item) => {
                  if (item.key === "about" || item.key === "client") {
                    return (
                      <Typography.Link
                        className="text-primary-dominant h-4"
                        key={item.key}
                        strong={true}
                        href={item.url}
                      >
                        <FormattedMessage id={`landing.navbar.${item.key}`} />
                      </Typography.Link>
                    );
                  }
                  return null;
                })}
              </div>
              <SelectLang
                style={{
                  padding: 0,
                  verticalAlign: "baseline",
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  color: colors["primary-dominant"],
                }}
                className="hover:text-slate-500 me-3"
              />
              {location.pathname.includes(SIGN_UP) && (
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(SIGN_IN);
                  }}
                >
                  <FormattedMessage id={`landing.navbar.signIn`} />
                </Button>
              )}
            </div>
          </div>
          <div className="h-full w-screen overflow-hidden flex justify-center items-center bg-white">
            <div className="max-w-[1440px] h-full flex flex-col justify-center items-start">
              <Outlet />
            </div>
          </div>
        </Layout>
      </Access>
    </div>
  );
}

export default LandingLayout;
