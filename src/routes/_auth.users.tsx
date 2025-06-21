import { UserTable } from "@/components/UserTable";
import { createFileRoute } from "@tanstack/react-router";

const UsersPage = () => {
  return <UserTable />;
};

export const Route = createFileRoute("/_auth/users")({
  component: UsersPage,
});
