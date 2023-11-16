"use client";
import { Drawer } from "@mui/material";
import { ArrowRightShort, XCircle } from "react-bootstrap-icons";
import Link from "next/link";
import CardInCart from "./CardInCart";
import { useSelectore } from "@/redux/store";

const Cart = ({
  isOpen,
  handlOpening,
}: {
  isOpen: boolean;
  handlOpening: () => void;
}) => {
  const cartProducts = useSelectore(
    (state) => state.CartSliceSliceReducer.cart
  );
  const totalPrice = useSelectore(
    (state) => state.CartSliceSliceReducer.totalePrice
  );

  return (
    <>
      <section className="container mt-16 ">
        {/* cards */}
        <Drawer
          anchor="right"
          open={isOpen}
          sx={{
            ".MuiDrawer-paper": {
              width: "500px",
              gap: "30px",
              paddingX: "20px",
            },
          }}
          onClose={() => handlOpening()}
        >
          <div className="flex justify-between my-8">
            <h2 className="mx-4 text-xl"> Shopping Cart </h2>
            <ArrowRightShort
              size={30}
              className="hover:text-blue-500 hover:scale-110 "
              onClick={() => handlOpening()}
            />
          </div>
          {/* <CardInCart /> */}
          {cartProducts.map((product) => {
            return (
              <CardInCart
                key={product.variationId}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                quantity={product.quantity}
                variationId={product.variationId}
                productId={product.productId}
                category={product.category}
                ramStorage={product.ramStorage}
                color={product.color}
              />
            );
          })}
          <div className="flex justify-between w-full mb-4">
            <span className="font-bold">Totle price </span>
            <span>{totalPrice} $</span>
          </div>
          <Link
            className="w-full text-center gradient_blue mb-5 text-white py-3 rounded-md"
            href={"/checkout"}
          >
            Checkout
          </Link>
        </Drawer>
      </section>
    </>
  );
};

export default Cart;
// flex items-center justify-center w-full h-full
