import { LoginForm } from "@/components/LoginForm";

import { createFileRoute } from "@tanstack/react-router";

const Login = () => {
  return <LoginForm />;
};

export const Route = createFileRoute("/login")({
  component: Login,
});
