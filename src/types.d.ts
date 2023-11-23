export interface SignUpValues {
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export interface LogInValues {
  email: string;
  password: string;
}

export interface CheckoutValues {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  zipCode: string;
  streetAddress: string;
  phoneNumber: string;
}

// https://api/product/getAllProducts
interface Product {
  id: string;
  title: string;
  description: string;
  discount: number;
  imageUrl: string;
  numberOfReview: number;
  review: number; // 3.5 / 5  4 / 5
}
interface data {
  products: Product[];
}

// https://api/product/getOneProduct?id=123
interface ProductVariation {
  id: string;
  qty: number;
  sku: string;
  price: number;
  optionsValues: {
    [key: string]: string;
  };
}
type ProductInCart = {
  variationId: string;
  productId: string;
  category: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  ramStorage: string;
};

interface ProductCard {
  title: string;
  id: string;
  description: string;
  name: string;
  manufacturerId: number;
  review: number;
}

// type ProductInCartWithId = {
//   [key: string]: ProductInCart;
// };

interface ProductDetails extends Product {
  specification: string;
  barCode: string;
  stars5: number; // how much person rate as 5
  stars4: number; // how much person rate as 4
  stars3: number; // how much person rate as 3
  stars2: number; // how much person rate as 2
  stars1: number; // how much person rate as 1
  manufacturer: string;
  manufacturerId: number;
  categoryId: number;
  category: string;
  nummberOfReview: number;
  productVariantDetailVM: ProductVariation[];
}

// https://api/product/postReview
interface PostReview {
  userId: string;
  productId: string;
  review: number;
}

interface shippingInfo {
  firstName: string;
  lastname: string;
  country: string;
  city: string;
  zipCode: string;
  streetAddress: string;
  phoneNumber: string;
}
