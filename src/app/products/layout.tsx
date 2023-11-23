import type { Metadata } from "next";
import Nav from "@/components/navBar/Nav";
import Filter from "@/app/products/[category]/components/Filter";

export const metadata: Metadata = {
  title: "Products",
  description: "Discover our new product each day",
};

export default function ProductsRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Nav bgColor="bg-white" />
      <section className="container mt-16">
        <Filter />
        {children}
      </section>
    </section>
  );
}
