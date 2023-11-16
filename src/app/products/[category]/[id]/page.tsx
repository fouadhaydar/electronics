"use client";
import Image from "next/image";
import image from "../../../../../public/assets/phones/Imgs.png";
import {
  ArrowDownCircle,
  ArrowLeftCircle,
  ArrowRightCircle,
  ArrowUpCircle,
  Star,
  StarFill,
} from "react-bootstrap-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import uuid from "react-uuid";
import RatingSysteme from "@/app/products/(components)/RatingSysteme";
import HorizontalSlider from "@/components/HorizentalSlider";
import Card from "@/components/Card";
import { useSelectore } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/product-slice";
import { getOneProduct, getProductsOfManufacturer } from "@/app/fetchData";
import { PhoneCard, ProductDetails, ProductVariation } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import NewProductSection from "@/components/NewProductSection"
// import Nav from "@/components/Nav"

interface ColorsSelected {
  color: string;
}
interface StorageRamSlected {
  storageRam: string;
}

type VariantArray = {
  [key: string]: string[];
};

const ProductDettails = ({ params }: { params: { id: string } }) => {
  const [details, setDetails] = useState<ProductDetails>();

  const [variantKeys, setVariantKeys] = useState<string[]>([]);
  const [variantValues, setVariantValues] = useState<string[]>([]);
  const [variantObj, setVariantObj] = useState<VariantArray>();
  const [lodaing, setLoding] = useState(false);
  const [targetProduct, setTargetProduct] = useState<
    ProductVariation | undefined
  >();
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [starsArr, setStarsArr] = useState<number[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [recomandationProducts, setRecomandationProducts] = useState<
    PhoneCard[]
  >([]);
  const [counter, setCounter] = useState(0);
  const [heightFull, setHeight] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [selectedStorageRam, setSlectedStorageRam] =
    useState<StorageRamSlected>({ storageRam: "" });
  const [selectedColor, setSelectedColor] = useState<ColorsSelected>({
    color: "",
  });
  // const [variantId, setVariantId] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  // get products in cart
  const products = useSelectore((state) => state.CartSliceSliceReducer.cart);

  // fetch data
  useEffect(() => {
    const productDetails = async () => {
      const data = await getOneProduct(params.id);
      if (data != undefined) {
        setStarsArr(() => [
          data.stars5,
          data.stars4,
          data.stars3,
          data.stars2,
          data.stars1,
        ]);
        setDetails(data);
        setLoding(true);
      }
    };
    productDetails();
  }, [params.id]);

  // get the index of the selected product
  const productIndex = useMemo(
    () =>
      products.findIndex((product) => targetProduct?.id == product.variationId),
    [products, targetProduct?.id]
  );

  // console.log(details);

  // const productFind = useMemo(
  //   () =>
  //     products.find((product) => {
  //       // console.log(product.variationId);
  //       return details?.productVariantDetailVM.find(
  //         (variant) => variant.id === product.variationId
  //       );
  //     }),
  //   [details?.productVariantDetailVM, products]
  // );
  // console.log(productFind);
  // details?.productVariantDetailVM.find(v => v.id == products)

  // useEffect(() => {
  //   if (productFind) {
  //     setSelectedColor(() => ({ color: productFind?.color }));
  //     setSlectedStorageRam(() => ({ storageRam: productFind.ramStorage }));
  //   }
  // }, [productFind]);
  // console.log(details);
  // get recomandation products
  useEffect(() => {
    if (details) {
      buildVariations(details);
    }
    const ProductsOfManufacturer = async () => {
      if (details) {
        const products: [] = await getProductsOfManufacturer(
          details?.manufacturerId
        );
        if (products != undefined)
          setRecomandationProducts(() => [...products]);
      }
    };
    ProductsOfManufacturer();
  }, [details]);

  useEffect(() => {
    setSlectedStorageRam(() => ({ storageRam: variantKeys[0] }));
    variantObj && setVariantValues(() => [...variantObj[variantKeys[0]]]);
  }, [variantKeys, variantObj]);

  const getVariantKeys = useMemo(() => {
    if (details) {
      return Object.keys(details.productVariantDetailVM[0].optionsValues);
    }
    return [];
  }, [details]);

  // console.log(selectedStorageRam.storageRam);

  const buildVariations = (data: ProductDetails) => {
    if (data) {
      let objKeys: string[] = [];
      const variantObj: VariantArray = {};
      let keys = getVariantKeys;

      data.productVariantDetailVM.forEach((option) => {
        // get key
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
      setVariantKeys(() => [...objKeys]);
      setVariantObj(() => ({ ...variantObj }));
    }
  };

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
        setTotalPrice(targetProductObj.price);
        return targetProductObj;
      }
    }
    // return "";
    // setTargetProductId(variant.id);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(() => ({ color }));
    const obj = setTargetProductDetails(color);
    // console.log(obj);
    if (obj) {
      // setTargetProduct(() => ({...obj}))
      setTargetProduct(obj);
    }
    if (counter == 0) handlePlus(true, obj?.qty);
    else {
      setCounter(1);
    }
  };
  // select storage
  const handleSelectStorageRam = (option: string) => {
    setSlectedStorageRam(() => ({ storageRam: option }));
    setSelectedColor(() => ({ color: "" }));
    setCounter(0);
    if (price > 0) setPrice(0);
    variantObj && setVariantValues(() => [...variantObj[option]]);
    setTargetProduct(undefined);
  };

  // update quantity
  const handleMinus = () => {
    if (selectedColor.color.length > 0 && counter > 1) {
      setCounter((prev) => (prev -= 1));
      setTotalPrice((prev) => (prev -= price));
      return;
    }
  };
  const handlePlus = (formColor: boolean, quantity: number | undefined) => {
    if (selectedColor.color.length == 0 && !formColor) {
      toast.warn("please select a color", {
        theme: "light",
      });
      return;
    }
    if (quantity != undefined && quantity > counter) {
      setCounter((prev) => (prev += 1));
      setTotalPrice((prev) => (prev += price));
      return;
    }
    toast.warn(`we only have ${quantity} from this combination`, {
      theme: "light",
    });
  };

  const getFullHeight = () => setHeight((prev) => !prev);

  // add to cart
  const handleAddToCart = () => {
    if (counter == 0) {
      toast.warn("please select a color", {
        theme: "light",
      });
      return;
    }
    if (details && targetProduct)
      if (productIndex != -1) {
        toast.warn("product alredy existe", {
          theme: "light",
        });
        return;
      } else {
        dispatch(
          addToCart({
            name: details.title,
            productId: params.id,
            variationId: targetProduct.id,
            category: details.category,
            imageUrl: details.imageUrl,
            price: totalPrice,
            quantity: counter,
            color: selectedColor.color,
            ramStorage: selectedStorageRam.storageRam,
          })
        );
      }

    toast.success("product was added", {
      theme: "light",
    });
  };

  // switch between the specifications and review
  const translateNgative = () => {
    if (ref?.current) {
      setHeight(false);
      setTranslateX(-ref.current?.offsetWidth);
      setShowReview(true);
    }
  };
  const translatePositive = () => {
    if (ref?.current) {
      setTranslateX(0);
      setShowReview(false);
    }
  };

  // data dose not fetched yet
  if (!lodaing) {
    return <div>Loding ...</div>;
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
                {variantKeys.length > 0 &&
                  variantKeys.map((option) => {
                    return (
                      <div key={uuid()}>
                        <button
                          className={`${
                            selectedStorageRam.storageRam == option
                              ? "bg-blue-400 text-white"
                              : "bg-white text-black"
                          } border  border-black  rounded-[4px] p-2 text-[12px] btn_hover`}
                          onClick={() => handleSelectStorageRam(option)}
                        >
                          {option}
                        </button>
                      </div>
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
                <div className="border border-black px-2 py-1 max-w-[70px] rounded-[4px] flex items-center justify-center">
                  <span onClick={handleMinus} className=" cursor-pointer p-1 ">
                    -
                  </span>{" "}
                  <span className="p-1">{counter}</span>{" "}
                  <span
                    onClick={() => handlePlus(false, quantity)}
                    className=" p-1 cursor-pointer"
                  >
                    +
                  </span>
                </div>
                <button
                  className="px-3 py-2 border border-black rounded-[4px] btn_hover"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
              <span className="text-black">
                Price: {counter == 1 || price == 0 ? price : totalPrice} $
              </span>
            </div>
          </div>
        </div>
        {/* reviews and description */}
        <hr className="bg-black w-full h-[1px]" />
        <div className="flex flex-col gap-6">
          {/* specification & reviews switcher */}
          <div className="flex gap-4 justify-center">
            <h3
              className={`${
                translateX == 0 ? "font-bold scale-105" : "font-normal"
              } section_title cursor-pointer`}
              onClick={translatePositive}
            >
              Detailed Specification
            </h3>
            <h3
              onClick={translateNgative}
              className={`${
                translateX < 0 ? "font-bold scale-105" : "font-normal"
              } section_title cursor-pointer`}
            >
              Reviews [5]
            </h3>
          </div>
          <div className="overflow-hidden ">
            <div
              className={`flex w-[200%] ${
                !heightFull ? "h-[350px]" : "h-full"
              } relative`}
            >
              {/*  full specification */}
              <div
                className={`overflow-hidden mb-16 w-[100%] transition ease-in-out duration-150 ${
                  !heightFull && "gradient"
                }`}
                style={{ transform: `translateX(${translateX}px)` }}
                ref={ref}
              >
                {/* render specification */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: details?.specification || "",
                  }}
                />
              </div>
              {!heightFull ? (
                <ArrowDownCircle
                  className="absolute bottom-0 left-[25%]"
                  size={20}
                  onClick={getFullHeight}
                />
              ) : (
                <ArrowUpCircle
                  className="absolute bottom-0 left-[25%]"
                  size={20}
                  onClick={getFullHeight}
                />
              )}
              {/* reviews */}
              {details && (
                <RatingSysteme
                  x={translateX}
                  totalNum={details!.nummberOfReview}
                  s={starsArr}
                  show={showReview}
                />
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
        <hr className="bg-black w-full h-[1px]" />

        {/* related Products */}
        <div className="my-16 h-[500px]">
          <h3 className="section_title">Related Products</h3>
          {/* cart of new product */}
          {recomandationProducts.length > 0 && (
            <HorizontalSlider
              PrevElement={ArrowLeftCircle}
              NextElement={ArrowRightCircle}
            >
              {recomandationProducts.map((product) => {
                return (
                  <Card
                    title={product.title}
                    description={product.description}
                    cardClass="card"
                    id={product.id}
                    key={product.id}
                    review={product.review}
                  />
                );
              })}
            </HorizontalSlider>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDettails;
// ["bg-black", "bg-blue-400", "bg-red-400", "bg-white"]
