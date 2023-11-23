interface ColorsSelected {
  color: string;
}
interface StorageRamSlected {
  storageRam: string;
}

type VariantArray = {
  [key: string]: string[];
};
interface State {
  counter: number;
  totalPrice: number;
  error: string | null;
}

type ActionType = "increment" | "decrement" | "reset-to-zero" | "reset-to-one";
