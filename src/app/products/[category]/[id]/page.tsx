"use client";
import Image from "next/image";
import image from "../../../../../public/assets/phones/Imgs.png";
import { StarFill } from "react-bootstrap-icons";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import uuid from "react-uuid";
import { useSelectore } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/product-slice";
import { ProductDetails, ProductInCart, ProductVariation } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import { CSSProperties } from "styled-components";
import { HashLoader } from "react-spinners";
import { Alert, AlertTitle } from "@mui/material";
import { setUserCredentials } from "@/redux/features/auth/userSlice";
import RelatedProducts from "./components/sections/RelatedProducts";
import InformationsSection from "./components/sections/InformationsSection";
import { setProductInLocalStoage } from "@/functions/LocalStorageFunctions";
import QuantityBtn from "./components/btns/QuantityBtn";
import OptionBtn from "./components/btns/OptionBtn";
import { reducer } from "./function/reducerFunction";

const ProductDettails = ({ params }: { params: { id: string } }) => {
  const [variantValues, setVariantValues] = useState<string[]>([]);
  const [variantObj, setVariantObj] = useState<VariantArray>();
  // from backend
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState(0);

  const [state, localDispatch] = useReducer(
    (state: State, action: ActionType) =>
      reducer(state, action, quantity, price),
    { counter: 0, totalPrice: 0, error: null }
  );
  const [starsArr, setStarsArr] = useState<number[]>([]);

  const [selectedStorageRam, setSlectedStorageRam] =
    useState<StorageRamSlected>({ storageRam: "" });
  const [selectedColor, setSelectedColor] = useState<ColorsSelected>({
    color: "",
  });
  const [targetProductId, setTargetProductId] = useState<string | undefined>(
    undefined
  );
  const dispatch = useDispatch();
  // get products existe in cart
  const products = useSelectore((state) => state.CartSliceSliceReducer.cart);
  // get accessToken
  const token = useSelectore((state) => state.user.token);

  // fetch and return details
  const {
    data: details,
    isLoading,
    error,
  } = useCustomeFetch<ProductDetails>(`/product/getoneproduct?id=${params.id}`);

  // set stars
  useEffect(() => {
    if (details) {
      setStarsArr(() => [
        details.stars5,
        details.stars4,
        details.stars3,
        details.stars2,
        details.stars1,
      ]);
      buildVariations(details);
    }
  }, [details]);

  // get the index of the selected product
  const productIndex = useMemo(
    () =>
      products.findIndex((product) => targetProductId == product.variationId),
    [products, targetProductId]
  );

  const getVariantKeys = useMemo(() => {
    if (details) {
      return Object.keys(details.productVariantDetailVM[0].optionsValues);
    }
    return [];
  }, [details]);

  const buildVariations = (data: ProductDetails) => {
    if (data) {
      let objKeys: string[] = [];
      const variantObj: VariantArray = {};
      let keys = getVariantKeys;
      let keyOption: string = "";

      data.productVariantDetailVM.forEach((option, index) => {
        //
        if (index === 0) {
          keyOption = option.optionsValues[keys[0]];
        }
        if (variantObj.hasOwnProperty(option.optionsValues[keys[0]])) {
          variantObj[option.optionsValues[keys[0]]].push(
            option.optionsValues[keys[1]]
          );
        } else {
          objKeys.push(option.optionsValues[keys[0]]);
          variantObj[option.optionsValues[keys[0]]] = [];
          variantObj[option.optionsValues[keys[0]]].push(
            option.optionsValues[keys[1]]
          );
        }
      });
      handleSelectStorageRam(keyOption);
      setVariantValues(() => [...variantObj[keyOption]]);
      setVariantObj(() => ({ ...variantObj }));
    }
  };

  // set the default [price , quantity] values of the target product
  // when we change the target color + return the variant obj
  const setTargetProductDetails = (color: string) => {
    if (details) {
      let keys = getVariantKeys;

      const targetProductObj = details?.productVariantDetailVM.find(
        (variant) =>
          variant.optionsValues[keys[0]] === selectedStorageRam.storageRam &&
          variant.optionsValues[keys[1]] === color
      );
      if (targetProductObj) {
        setQuantity(targetProductObj.qty);
        setPrice(targetProductObj.price);
        return targetProductObj;
      }
    }
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(() => ({ color }));
    let obj = setTargetProductDetails(color);
    if (obj) {
      setTargetProductId(obj.id);
    }
    localDispatch("reset-to-one");
  };
  // select storage
  const handleSelectStorageRam = (option: string) => {
    setSlectedStorageRam(() => ({ storageRam: option }));
    setSelectedColor(() => ({ color: "" }));
    localDispatch("reset-to-zero");
    if (price > 0) setPrice(0);
    variantObj && setVariantValues(() => [...variantObj[option]]);
    setTargetProductId(undefined);
  };

  // update quantity
  const decrement = useCallback(() => {
    if (selectedColor.color.length > 0) {
      localDispatch("decrement");
      return;
    }
  }, [selectedColor]);

  const increment = useCallback(
    (formColor: boolean) => {
      if (selectedColor.color.length == 0 && !formColor) {
        toast.warn("please select a color", {
          theme: "light",
        });
        return;
      }
      localDispatch("increment");
    },
    [selectedColor]
  );
  // add to cart
  const handleAddToCart = () => {
    if (state.counter == 0) {
      toast.warn("please select a color", {
        theme: "light",
      });
      return;
    }
    if (details && targetProductId)
      if (productIndex != -1) {
        toast.warn("product alredy existe", {
          theme: "light",
        });
        return;
      } else {
        const product = {
          name: details.title,
          productId: params.id,
          variationId: targetProductId,
          category: details.category,
          imageUrl: details.imageUrl,
          price: state.totalPrice,
          quantity: state.counter,
          color: selectedColor.color,
          ramStorage: selectedStorageRam.storageRam,
        };
        dispatch(addToCart(product));
        setProductInLocalStoage(product, state.totalPrice);
        toast.success("product was added", {
          theme: "light",
        });
      }
  };
  // data dose not fetched yet

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <HashLoader
          loading={isLoading}
          cssOverride={override}
          color={"#006d1d"}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (error) {
    if (error) {
      return (
        <div className=" min-h-[100vh] flex justify-center items-center">
          <Alert severity="error" className="w-full py-6">
            <AlertTitle className="font-bold">Error</AlertTitle>
            {error}
          </Alert>
        </div>
      );
    }
  }
  return (
    <>
      <ToastContainer />
      <section className="container py-10 flex flex-col gap-10">
        {/* image and details */}
        <div className="flex xsm:flex-col lg:flex-row gap-4 items-center p-5">
          {/* image */}
          <div className="xsm:hidden lg:block w-[30%] p-10">
            <Image src={image} height={400} alt={"phone"} />
          </div>
          {/* details */}
          <div className="flex flex-col gap-6 w-[70%]">
            <div className="flex flex-col gap-2 justify-start ">
              <h2 className="secondary_text">{details?.title}</h2>
            </div>
            <div className="flex gap-2 justify-start items-center ">
              <div className="flex gap-1">
                <StarFill color="gold" size={20} />
              </div>
              <hr className="w-[2px] h-3 bg-white" />
              <span>{details?.review}</span>
            </div>
            <div className="">
              <p>{details?.description}</p>
            </div>
            {/* storage and ram btns */}
            <div className=" flex flex-col justify-start gap-2">
              <span className="text-gray-400">RAM / Storage</span>
              <div className="flex flex-wrap items-center gap-2 ">
                {variantObj &&
                  Object.keys(variantObj).map((option) => {
                    return (
                      <OptionBtn
                        key={uuid()}
                        option={option}
                        storageRam={selectedStorageRam.storageRam}
                        handleSelectStorageRam={handleSelectStorageRam}
                      />
                    );
                  })}
              </div>
            </div>
            {/* start of btns colors */}
            <div className="flex flex-col justify-start gap-2">
              <span>Colors</span>
              <div className="flex flex-wrap gap-2">
                {variantValues &&
                  variantValues?.map((color) => {
                    return (
                      <div
                        key={uuid()}
                        className={`bg-white border-[2px] rounded-full p-1 ${
                          selectedColor.color === color
                            ? "  border-blue-600 "
                            : " border-white"
                        } hover:border-blue-600 transition duration-100 ease-in-out`}
                      >
                        <div
                          className={`rounded-full w-14 h-14 cursor-pointer `}
                          onClick={() => handleSelectColor(color)}
                          style={{
                            backgroundColor: color,
                            border: "1px solid black",
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* add to cart and quntity */}
            <div className="flex xsm:flex-col md:flex-row justify-between md:items-end xsm:items-start gap-2">
              <div className="flex xsm:flex-col md:flex-row justify-start gap-2 ">
                <QuantityBtn
                  selectedColor={selectedColor}
                  handleMinus={decrement}
                  handlePlus={increment}
                  counter={state.counter}
                />
                <button
                  className="px-3 py-2 border border-black rounded-[4px] btn_hover"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
              <span className="text-black">
                Price:{" "}
                {state.counter == 1 || price == 0 ? price : state.totalPrice} $
              </span>
            </div>
            {state.error && <p className="text-red-500">{state.error} </p>}
          </div>
        </div>
        {/* reviews and description */}
        {details && (
          <InformationsSection
            starsArr={starsArr}
            numberOfReviews={details.nummberOfReview}
            sepcification={details.specification}
            productId={params.id}
          />
        )}
        {/* related Products */}
        {details && <RelatedProducts manufacturerId={details.manufacturerId} />}
      </section>
    </>
  );
};

export default ProductDettails;
// ["bg-black", "bg-blue-400", "bg-red-400", "bg-white"]
