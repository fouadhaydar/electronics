import svg from "../../../public/assets/img-new-logo-low-quality.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-16">
      <section className="container py-10 px-2">
        <div className="mb-10 flex justify-between">
          <div>
            <Image src={svg} alt="logo" width={30} height={30} />
          </div>
          <div>
            <span className="block mb-4">Links</span>
            <div className="flex flex-col text-gray-400 gap-1">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Products</Link>
              <Link href={"/"}>Profile</Link>
            </div>
          </div>
          <div>
            <span className="block mb-4">Help</span>
            <div className="flex flex-col text-gray-400 gap-1">
              <span>Payment option</span>
              <span>Returns</span>
              <span>Privacy and Policies</span>
            </div>
          </div>
        </div>
        <hr className="w-full h-[1px] bg-black" />
        <div className="text-center w-full py-5">
          <span> &copy; 2023 Electronics </span>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
