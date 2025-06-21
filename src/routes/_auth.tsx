import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { user } from "@/entities/User/useUserStore";

const AuthLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    try {
      await user.getDataAboutMe();
      const isAuth = user.isAuth();
      if (!isAuth) {
        throw redirect({ to: "/login" });
      }
    } catch {
      // If getDataAboutMe fails (e.g., user not authenticated), redirect to login
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});
