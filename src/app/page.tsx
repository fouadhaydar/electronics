"use client";
// import Cart from "@/components/navBar/cart/Cart";
import Hero from "@/components/Hero";
import Nav from "@/components/navBar/Nav";
import NewProductSection from "@/components/NewProductSection";

const Home = () => {
  return (
    <>
      <section>
        <Nav bgColor="bg-black" />
        <Hero />
        <NewProductSection header="Explore what is fresh and current, at this moment." />
        <NewProductSection header="Special Offers" />
      </section>
    </>
  );
};
export default Home;
