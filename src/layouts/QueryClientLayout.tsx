import { Outlet } from "@umijs/max";
import { QueryClient, QueryClientProvider } from "react-query";
import logo from "@/assets/logo/logo.png";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
function QueryClientLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="lg:block hidden">
        <Outlet />
      </div>
      <div className="lg:hidden w-screen h-screen flex items-center justify-center">
        <div className="max-w-[250px] text-primary-dominant flex flex-col items-center gap-4">
          <img src={logo} alt="logo" className="w-[100px]" />
          <span>This device is not supported</span>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default QueryClientLayout;
