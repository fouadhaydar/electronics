"use client";
import { Alert, AlertTitle, Drawer } from "@mui/material";
import { ArrowRightShort } from "react-bootstrap-icons";
import CardInCart from "./CardInCart";
import { useSelectore } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/product-slice";
import useAxiosInterceptors from "@/app/(auth)/hooks/useAxiosInterceptors";
import { setUserCredentials } from "@/redux/features/auth/userSlice";
import useSetToken from "@/hooks/useSetToken";

const Cart = ({
  isOpen,
  handlOpening,
}: {
  isOpen: boolean;
  handlOpening: () => void;
}) => {
  const router = useRouter();
  const token = useSelectore((state) => state.user.token);

  const [innerWidth, setInnerWidth] = useState<number | undefined>(undefined);

  const updateInnerWidth = () => {
    setInnerWidth(window.innerWidth);
  };

  // Effect to add and remove the resize event listener
  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener("resize", updateInnerWidth);

    // Remove event listener on component unmount to avoid memory leaks
    return () => {
      window.removeEventListener("resize", updateInnerWidth);
    };
  }, []);

  const cartProducts = useSelectore(
    (state) => state.CartSliceSliceReducer.cart
  );
  const totalPrice = useSelectore(
    (state) => state.CartSliceSliceReducer.totalePrice
  );

  const dispatch = useDispatch();

  const [text, setText] = useState(false);

  const handleClick = () => {
    if (cartProducts.length == 0) {
      setText(true);
    } else {
      if (token) {
        router.push("/checkout");
      } else {
        router.push("/log-in");
      }
    }
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <section className="container">
        {/* cards */}
        <Drawer
          anchor="right"
          open={isOpen}
          sx={{
            ".MuiDrawer-paper": {
              width:
                innerWidth &&
                (innerWidth < 400
                  ? "300px"
                  : innerWidth > 400 && innerWidth < 500
                  ? "400px"
                  : "500px"),
              gap: "30px",
              paddingX: "20px",
            },
          }}
          onClose={() => {
            setText(false);
            handlOpening();
          }}
        >
          <div className="flex justify-between my-8">
            <h2 className=" xsm:text-lg md:text-xl"> Shopping Cart </h2>
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
          <div className="flex xsm:flex-col md:flex-row justify-center gap-2 md:mb-5 xsm:mb-0">
            <button
              className="w-full text-center bg-red-500  text-white py-3 rounded-md"
              onClick={clear}
            >
              Clear Cart
            </button>
            <button
              className="w-full text-center gradient_blue text-white py-3 rounded-md"
              onClick={handleClick}
            >
              Checkout
            </button>
          </div>
          {text && (
            <Alert severity="warning" className="w-full">
              <AlertTitle className="font-bold">Warning</AlertTitle>
              you {"haven't"} anything to buy
            </Alert>
          )}
        </Drawer>
      </section>
    </>
  );
};

export default Cart;
// flex items-center justify-center w-full h-full
