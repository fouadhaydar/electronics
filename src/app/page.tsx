"use client";
// import Cart from "@/components/navBar/cart/Cart";
import Hero from "@/app/homeComponents/Hero";
import Nav from "@/components/navBar/Nav";
import NewProductSection from "@/app/homeComponents/NewProductSection";
import ProductCategory from "@/app/homeComponents/ProductCategory";

const Home = () => {
  return (
    <>
      <section>
        <Nav bgColor="bg-black" />
        <Hero />
        <ProductCategory />
        <NewProductSection header="Explore what is fresh and current, at this moment." />
        <NewProductSection header="Special Offers" />
      </section>
    </>
  );
};
export default Home;
