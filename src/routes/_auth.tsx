import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { user } from "@/entities/User/useUserStore";

const AuthLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    await user.getDataAboutMe();
    const isAuth = user.isAuth();
    if (!isAuth) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});
