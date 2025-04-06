import { createFileRoute } from "@tanstack/react-router";
import { ProductTable } from "@/components/ProductTable";

const Products = () => {
  return (
    <>
      <ProductTable />
    </>
  );
};

export const Route = createFileRoute("/products/")({
  component: Products,
});
