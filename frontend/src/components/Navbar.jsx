import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Box, Drawer, Avatar, IconButton, Menu, MenuItem, Badge, Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import logoDarkMode from "../assets/logoDarkMode.png";
import logoLightMode from "../assets/logoLightMode.png";
import { ThemeContext } from '../context/ThemeProvider';
import { UserAuthContext } from '../context/AuthProvider';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { authUser } = useContext(UserAuthContext);

    const location = useLocation();

    const isAdmin = authUser && authUser.role === 'admin';
    const orderCount = 3;

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);
    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const linkStyle = "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer hover:bg-aqua dark:hover:bg-[#164e63]";
    const activeLinkStyle = "bg-gray-500/20 dark:bg-aqua dark:bg-[#164e63]";
    
    const navItems = [
        { label: 'Home', icon: <HomeIcon />, path: '/home', visible: true },
        { label: 'About Us', icon: <Diversity3Icon />, path: '/about', visible: true },
        { label: 'Products', icon: <StorefrontIcon />, path: '/products', visible: true },
        { label: 'Received Orders', icon: <ReceiptLongIcon />, path: '/orders', visible: isAdmin },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full shadow-md px-4 py-2 flex justify-between items-center transition-colors duration-300 bg-gray-100 text-black dark:bg-[#282828] dark:text-white">
                <div className="flex items-center gap-4">
                    <div className="md:hidden">
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon className="text-gray-700 dark:text-gray-300" />
                        </IconButton>
                    </div>

                    <Link to="/">
                        <img
                            src={theme === 'light' ? logoLightMode : logoDarkMode}
                            alt="logo"
                            loading='lazy'
                            className="h-8 object-cover rounded-md"
                        />
                    </Link>

                    <div className="hidden md:flex gap-4 ml-4">
                        {navItems.map((item, idx) =>
                            item.visible && (
                                <Link key={idx * 0.5} to={item.path} className={`${linkStyle} ${location.pathname === item.path ? activeLinkStyle : ''}`}>
                                    {item.icon} {item.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <IconButton onClick={toggleTheme}>
                        {theme === 'light'
                            ? <Brightness4Icon className="text-gray-700" />
                            : <Brightness7Icon className="text-gray-300" />
                        }
                    </IconButton>

                    <Tooltip title="Cart">
                        <Link to="/my-orders">
                            <div className="rounded-lg px-2 py-1 bg-[#FDE12D] flex items-center">
                                <ShoppingCartIcon className="text-gray-700 mt-1" sx={{ fontSize: "1.2rem" }} />
                                <span className='ps-1 font-semibold text-lg text-gray-700'>{orderCount}</span>
                            </div>
                        </Link>
                    </Tooltip>

                    {authUser ? (
                        <IconButton onClick={handleMenuClick}>
                            <Avatar alt={authUser.fullName} src={authUser.image} />
                        </IconButton>
                    ) : (
                        <Link to="/login" className={`${linkStyle} ${theme === 'light' ? "hover:bg-gray-200" : "hover:bg-[#363636]"}`}>
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                    <Link to={`/${authUser.username}/edit-profile`}>Edit Profile</Link>
                </MenuItem>
                <MenuItem onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box className={`w-64 p-4 flex flex-col gap-4 h-full ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-[#282828] text-white'}`}>
                    {navItems.map((item, idx) =>
                        item.visible && (
                            <Link key={idx * 0.9} to={item.path} className={linkStyle}>
                                {item.icon} {item.label}
                            </Link>
                        )
                    )}
                    <Link to="/my-orders" className={linkStyle}>
                        <Badge badgeContent={orderCount} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                        My Orders
                    </Link>
                    {!authUser && (
                        <Link to="/login" className={`${linkStyle} ${theme === 'light' ? "hover:bg-gray-200" : "hover:bg-[#363636]"}`}>
                            Login
                        </Link>
                    )}
                </Box>
            </Drawer>
        </>
    );
}
