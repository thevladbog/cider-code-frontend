import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { createFileRoute } from "@tanstack/react-router";

const ResetForm = () => {
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
};

export const Route = createFileRoute("/login/reset")({
  component: ResetForm,
});
