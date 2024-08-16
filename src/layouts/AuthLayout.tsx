import NoFoundPage from "@/pages/404";
import { getRootPath } from "@/utils/common";
import { Access, useAccess, useLocation } from "@umijs/max";
import {
  BM_ROUTES,
  DEFAULT_KEY_BM,
  DEFAULT_KEY_RP,
  RP_ROUTES,
} from "./menuItems";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: IAuthLayoutProps) {
  const access = useAccess();
  const location = useLocation();
  const DEFAULT_KEY = access.isBM ? DEFAULT_KEY_BM : DEFAULT_KEY_RP;

  const getRoutes = () => {
    if (access.isBM) {
      return BM_ROUTES;
    } else if (access.isHST) {
      return BM_ROUTES;
    } else if (access.isRP) {
      return RP_ROUTES;
    } else {
      return [];
    }
  };

  const isAccessible = (path: string) => {
    const rootPath = getRootPath(path) || DEFAULT_KEY;
    return getRoutes().includes(rootPath);
  };

  return (
    <Access
      accessible={isAccessible(location.pathname)}
      fallback={<NoFoundPage />}
    >
      {children}
    </Access>
  );
}

export default AuthLayout;
