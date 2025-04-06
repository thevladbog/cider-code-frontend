import { createFileRoute } from "@tanstack/react-router";
import { ShiftTable } from "@/components/ShiftTable";

const Index = () => {
  return <ShiftTable />;
};

export const Route = createFileRoute("/")({
  component: Index,
});
