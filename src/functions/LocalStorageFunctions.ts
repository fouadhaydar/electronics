import { ProductInCart } from "@/types";

export const getProductsFromLocalStorage = (): ProductInCart[] | null => {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : null;
};

export const getPriceFromLocalStorage = (): number | 0 => {
  const price = localStorage.getItem("totalPrice");
  return price ? JSON.parse(price) : 0;
};

export const setProductInLocalStoage = (
  newItem: ProductInCart,
  totalePrice: number
) => {
  let products = getProductsFromLocalStorage();
  let price = getPriceFromLocalStorage();

  if (products) {
    products.push(newItem);
  } else {
    products = [];
    products.push(newItem);
  }
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("totalPrice", JSON.stringify((price += totalePrice)));
};
