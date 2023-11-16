"use client";
import Link from "next/link";
import { CartFill, PersonFill } from "react-bootstrap-icons";
import DropDownMen from "./DropDownMenu";
import { MouseEvent, useCallback, useRef, useState } from "react";
import Cart from "./cart/Cart";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

const Nav = ({ bgColor }: { bgColor?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handlOpening = useCallback(() => setIsOpen((prev) => !prev), []);

  const linkRef = useRef<HTMLAnchorElement>();
  const [show, setShow] = useState<boolean>(false);
  // const handleShow = () => setShow(prev => !prev)

  const text_color = bgColor == "bg-black" ? "text-white" : "text-black";
  const link_style = `${text_color} hover:text-blue-500 text-[12px] hover:scale-110`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (to?: string) => {
    if (to) router.push(to);
    setAnchorEl(null);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <nav className={`${bgColor}  py-[12px] h-[50px]`}>
      <div
        className={`container flex justify-between items-center transition duration-300 ease-in-out ${
          show === true ? ` h-full  overflow-hidden` : "h-full "
        } ${bgColor} `}
      >
        {/* <Link href="/" className={link_style} style={{textDecoration: 'none'}}>Logo</Link> */}
        {/* <hr className="line " /> */}
        <Link href="/" className={link_style}>
          {/* {width > 480 ?  <span>Home</span> : <HouseDoorFill color="white" size={'20px'}/>} */}
          Home
        </Link>
        {/* <hr className="line" /> */}
        {/* <Link href="/products" className='hover:text-blue-500 text-white text-sm'>Products</Link> */}
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
        {/* <hr className="line " /> */}
        <CartFill
          size={"16px"}
          className={`${link_style} nav_icon_link`}
          onClick={() => {
            handlOpening();
          }}
        />
        {/* <Link href='/cart'> */}
        {/* <hr className="line" /> */}
        {/* <Link href="/sign-up"> */}{" "}
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e)}>
          <PersonFill size={"16px"} className={`${link_style} nav_icon_link`} />{" "}
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
          {/* <MenuItem onClick={handleClose}></MenuItem> */}
          <MenuItem onClick={() => handleClose("/log-in")}>Log in</MenuItem>
        </Menu>
        {/* <DropDownMen menuItem={["sign-up", "log-in"]} color="text_color" /> */}
        {/* </Link> */}
        {/* <hr className="line" /> */}
      </div>
      {/* <List size={'20px'} color="white" onClick={handleShow} className=" cursor-pointer xsm:block sm:hidden absolute top-[1rem] right-[1rem]"/> */}
      <Cart isOpen={isOpen} handlOpening={handlOpening} />
    </nav>
  );
};

export default Nav;
