'use client'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, BoxSeam, CaretDown, CaretDownFill, CaretUp, CaretUpFill } from 'react-bootstrap-icons';


export default function DropDownMen({menuItem, color} : {menuItem: string [], color:string}) {
    
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
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
            sx = {{
                color:color,
                textTransform:'none',
                padding:0,
                fontSize:'12px'
            }}
            className='hover:scale-110 hover:text-blue-500'
            endIcon = {open ? <CaretDownFill size={'12px'}/>: <CaretUpFill size={'12px'}/>}
        >
          Products
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        > 
          {menuItem.map((item) => {
            return (
                <Link href={`/${item}`} key={item}> 
                    <MenuItem onClick={handleClose} >{item}</MenuItem>
                </Link>
            )
          })}
        </Menu>
      </div>
    );
  }