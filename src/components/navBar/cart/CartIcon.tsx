import { useSelectore } from "@/redux/store";
import { CartFill } from "react-bootstrap-icons";

const CartIcon = ({
  bgColor,
  handlOpening,
}: {
  bgColor?: string;
  handlOpening: () => void;
}) => {
  const text_color = bgColor == "bg-black" ? "text-white" : "text-black";
  const link_style = `${text_color} hover:text-blue-500 text-[12px] hover:scale-110`;
  const number = useSelectore(
    (state) => state.CartSliceSliceReducer.cart.length
  );
  return (
    <div className="w-[20px] h-[20px] relative">
      <CartFill
        size={"20px"}
        className={`${link_style} nav_icon_link `}
        onClick={() => {
          handlOpening();
        }}
      />
      {number > 0 && (
        <div className="rounded-full bg-red-600 w-[20px] h-[20px] absolute top-[-8px] right-[-12px] text-[16px] flex items-center justify-center text-white">
          <span>{number}</span>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
