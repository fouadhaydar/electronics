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
  quantity: number;
  sku: string;
  price: number;
  options: {
    [key: string]: string;
  };
}

interface ProductDetails extends Product {
  specification: string;
  barCode: string;
  star5: number; // how much person rate as 5
  star4: number; // how much person rate as 4
  star3: number; // how much person rate as 3
  star2: number; // how much person rate as 2
  star1: number; // how much person rate as 1
  manufacturer: string;
  category: string;
  productVariantDetailVM: ProductVariation[];
}

// https://api/product/postReview
interface PostReview {
  userId: string;
  productId: string;
  review: number;
}
