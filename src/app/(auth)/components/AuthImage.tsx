import Image from "next/image";
import phone from "../../../../public/assets/phones/iphone-compare-iphone-15-pro-202309.jpeg";

const AuthImage = () => {
  return (
    <div className="rounded-full w-[400px] h-[400px] relative ">
      <Image
        src={phone}
        height={400}
        alt="phone"
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
    </div>
  );
};

export default AuthImage;
