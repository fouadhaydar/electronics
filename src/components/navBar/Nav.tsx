"use client";
import Link from "next/link";
import { GridFill, HouseFill, PersonFill } from "react-bootstrap-icons";
import DropDownMen from "./DropDownMenu";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Cart from "./cart/Cart";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/assets/img-new-logo-low-quality.svg";
import dynamic from "next/dynamic";
import { useSelectore } from "@/redux/store";
import { axiosAuth } from "@/app/(auth)/api/axiosAuth";
import useAxiosInterceptors from "@/app/(auth)/hooks/useAxiosInterceptors";
import { useDispatch } from "react-redux";
import { logOut, setUserCredentials } from "@/redux/features/auth/userSlice";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import { Category } from "@/types";
const CartIcon = dynamic(() => import("./cart/CartIcon"), { ssr: false });

const Nav = ({ bgColor }: { bgColor?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handlOpening = useCallback(() => setIsOpen((prev) => !prev), []);
  const token = useSelectore((state) => state.user.token);
  const axiosInterceptor = useAxiosInterceptors();
  const dispatch = useDispatch();

  const [show, setShow] = useState<boolean>(false);
  const [logIn, setLogIn] = useState(false);

  useEffect(() => {
    if (token) setLogIn(true);
    else setLogIn(false);
  }, [token]);

  const text_color = bgColor === "bg-black" ? "text-white" : "text-black";
  const link_style = `${text_color} hover:text-blue-500 text-[16px] hover:scale-110`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const {
    data: cat,
    isLoading,
    error,
  } = useCustomeFetch<Category[]>("/category/getallcategory");

  const handleClose = (to?: string) => {
    if (to) router.push(to);
    setAnchorEl(null);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const userlogOut = async () => {
    const controller = new AbortController();
    try {
      await axiosInterceptor({
        url: "/user/logout",
        signal: controller.signal,
      });
      dispatch(logOut());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav
      className={`md:rounded-none w-[100%] text-white py-3 fixed z-20 top ${
        bgColor == "bg-white" ? "md:bg-white xsm:bg-black" : "bg-black"
      }`}
    >
      <div className="container justify-between items-center xsm:hidden md:flex ">
        <Link className="flex-1" href={"/"}>
          <Image height={20} width={20} src={logo} alt="phone" />
        </Link>
        <div
          className={`flex justify-between items-center transition duration-300 ease-in-out flex-1 ${
            show === true ? ` h-full  overflow-hidden` : "h-full"
          } ${bgColor} `}
        >
          <Link href="/" className={link_style}>
            Home
          </Link>
          {cat && <DropDownMen menuItem={cat} color={text_color} />}
          <CartIcon handlOpening={handlOpening} bgColor={bgColor} />
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e)}
          >
            <PersonFill
              size={"20px"}
              className={`${link_style} nav_icon_link`}
            />{" "}
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("/sign-up")}>Sgin up</MenuItem>
            <MenuItem
              onClick={() => (logIn ? userlogOut() : handleClose("/log-in"))}
            >
              {logIn ? "log out" : " log in"}
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="xsm:flex justify-around items-center md:hidden text-white">
        <Link href={"/"}>
          <HouseFill color="#007aff" size={"20px"} />
        </Link>
        <Link href={"/categories"}>
          <GridFill color="#007aff" size={"20px"} />
        </Link>
        <CartIcon handlOpening={handlOpening} bgColor={"#007aff"} />
        <Link href={"/log-in"}>
          <PersonFill size={"20px"} color="#007aff" />{" "}
        </Link>
      </div>
      <Cart isOpen={isOpen} handlOpening={handlOpening} />
    </nav>
  );
};

export default Nav;
