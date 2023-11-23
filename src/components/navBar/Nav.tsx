"use client";
import Link from "next/link";
import { CartFill, PersonFill } from "react-bootstrap-icons";
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
  // console.log(token);
  return (
    <nav className={`${bgColor}  py-[12px] h-[50px]`}>
      <div className="container flex justify-between items-center">
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
          <DropDownMen
            menuItem={[
              "laptops",
              "phones",
              "pcs",
              "tablets",
              "earbuds",
              "smart-watches",
            ]}
            color={text_color}
          />
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
            {/* // <MenuItem onClick={() => logOut()}>Log out</MenuItem> */}
          </Menu>
        </div>
      </div>
      <Cart isOpen={isOpen} handlOpening={handlOpening} />
    </nav>
  );
};

export default Nav;
