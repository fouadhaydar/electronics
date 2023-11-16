const PRODUCTS_API =
  "http://192.168.1.11:5148/api/product/getproductsofcategory?catName";

const ONE_PRODUCT = "http://192.168.1.11:5148/api/product/getoneproduct?id";
const PRODUCTS_OF_MANIFACTURER =
  "http://192.168.1.11:5148/api/product/getproductsofmanufacturer?id";
const ALL_MANIFACTURER =
  "http://192.168.1.11:5148/api/manufacturer/getallmanufacturer";

const ALL_CATEGORIES = "http://192.168.1.11:5148/api/category/getallcategory";

export const getProducts = async (catName: string) => {
  try {
    const res = await fetch(`${PRODUCTS_API}=${catName}`);
    return await res.json();
  } catch {
    throw new Error("faild to fetch data");
  }
};
export const getOneProduct = async (id: string) => {
  try {
    const res = await fetch(`${ONE_PRODUCT}=${id}`);
    return res.json();
  } catch {
    throw new Error("faild to fetch data");
  }
};

export const getProductsOfManufacturer = async (id: number) => {
  try {
    const res = await fetch(`${PRODUCTS_OF_MANIFACTURER}=${id}`);
    return await res.json();
  } catch {
    throw new Error("data dose not exists");
  }
};

export const getAllManufacturer = async () => {
  try {
    const res = await fetch(`${ALL_MANIFACTURER}`);
    return await res.json();
  } catch {
    throw new Error("data dose not exists");
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${ALL_CATEGORIES}`);
    return await res.json();
  } catch {
    throw new Error("data dose not exists");
  }
};
