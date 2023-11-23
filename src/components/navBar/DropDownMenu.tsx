"use client";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

export default function DropDownMen({
  menuItem,
  color,
}: {
  menuItem: string[];
  color: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between gap-2 hover:text-blue-500 ${color}`}
      >
        <button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className=" text-[16px]"
        >
          Products
        </button>
        {open ? (
          <ChevronDown size={"16px"} className="font-bold" />
        ) : (
          <ChevronUp size={"16px"} className="font-bold" />
        )}
      </div>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {menuItem.map((item) => {
          return (
            <Link href={`/${item}`} key={item}>
              <MenuItem onClick={handleClose}>{item}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
}
