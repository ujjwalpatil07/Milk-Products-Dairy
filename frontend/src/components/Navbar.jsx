import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Box, Drawer, Avatar, IconButton, Badge, Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CallIcon from '@mui/icons-material/Call';
import BuildIcon from '@mui/icons-material/Build';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import logoDarkMode from "../assets/logoDarkMode.png";
import logoLightMode from "../assets/logoLightMode.png";
import { ThemeContext } from '../context/ThemeProvider';
import { UserAuthContext } from '../context/AuthProvider';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { authUser } = useContext(UserAuthContext);

    const location = useLocation();
    const orderCount = 3;

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const linkStyle = "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer";
    const activeLinkStyle = "bg-gray-500/20 dark:bg-[#00000091] dark:text-white";

    const navItems = [
        { label: 'Home', icon: <HomeIcon sx={{ fontSize: '1.2rem' }} />, path: '/home' },
        { label: 'Products', icon: <StorefrontIcon sx={{ fontSize: '1.2rem' }} />, path: '/products' },
        { label: 'Our Services', icon: <BuildIcon sx={{ fontSize: '1.2rem' }} />, path: '/services' },
        { label: 'About Us', icon: <Diversity3Icon sx={{ fontSize: '1.2rem' }} />, path: '/about' },
        { label: 'Contact Us', icon: <CallIcon sx={{ fontSize: '1.2rem' }} />, path: '/contact' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full shadow-md px-4 py-2 flex justify-between items-center transition-colors duration-300 bg-gray-100/70 text-black dark:bg-[#282828]/70 dark:text-white backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="lg:hidden bg-gray-500/10 hover:bg-gray-500/20 dark:bg-[#00000050] dark:hover:bg-[#00000090] rounded-full">
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon className="text-gray-700 dark:text-gray-300" />
                        </IconButton>
                    </div>

                    <Link to="/">
                        <img
                            src={theme === 'light' ? logoLightMode : logoDarkMode}
                            alt="logo"
                            loading='lazy'
                            className="h-12 object-cover rounded-md"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex gap-2 ml-4">
                    {navItems.map((item, idx) =>
                        <Link key={idx * 0.5} to={item.path} className={`${linkStyle} ${location.pathname.startsWith(item.path) ? activeLinkStyle : ''}`}>
                            {item.label}
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {
                        (authUser) && <Tooltip title="Cart">
                            <Link to="/my-orders">
                                <div className="rounded-lg px-2 py-1 bg-[#FDE12D] flex items-center shadow-md">
                                    <ShoppingCartIcon className="text-gray-700 mt-1" sx={{ fontSize: "1.2rem" }} />
                                    <span className='ps-1 font-semibold text-lg text-gray-700'>{orderCount}</span>
                                </div>
                            </Link>
                        </Tooltip>
                    }

                    <div className='hidden sm:flex bg-gray-500/10 hover:bg-gray-500/20 dark:bg-[#00000050] dark:hover:bg-[#00000090] rounded-full'>
                        <IconButton onClick={toggleTheme}>
                            {theme === 'light'
                                ? <DarkModeIcon className="text-gray-700" />
                                : <LightModeIcon className="text-gray-300" />
                            }
                        </IconButton>
                    </div>

                    {authUser ? (
                        <Link to={`/user-profile/${authUser?.username}`} sx={{ padding: "0px" }}>
                            <Avatar alt={authUser?.fullName} src={authUser?.image} />
                        </Link>
                    ) : (
                        <div className='space-x-2'>
                            <Link to="/login" className={`text-white bg-[#843E71] px-3 py-[0.4rem] rounded-sm`}>
                                Login
                            </Link>
                            <Link to="/signup" className={`border text-[#843E71] border-[#843E71] dark:text-white dark:border-gray-500 px-3 py-[0.4rem] rounded-sm`}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <Drawer open={open} onClose={toggleDrawer(false)} >
                <Box className={`w-64 p-4 flex flex-col gap-4 h-full overflow-auto bg-gray-100 text-black dark:bg-[#282828] dark:text-white'}`}>
                    <div className='flex-1 space-y-4'>
                        {navItems.map((item, idx) =>
                            <Link key={idx * 0.9} onClick={toggleDrawer(false)} to={item.path} className={linkStyle}>
                                {item.icon} {item.label}
                            </Link>
                        )}
                    </div>

                    <div className='space-y-4'>
                        {authUser && (<Link to="/my-orders" onClick={toggleDrawer(false)} className={linkStyle}>
                            <Badge badgeContent={orderCount} color="primary">
                                <ShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
                            </Badge>
                            My Orders
                        </Link>)}

                        {!authUser && (
                            <Link to="/login" onClick={toggleDrawer(false)} className={linkStyle}>
                                <LoginIcon sx={{ fontSize: '1.2rem' }} /> Login
                            </Link>
                        )}

                        {authUser && (
                            <button onClick={toggleDrawer(false)} className={linkStyle}>
                                <LogoutIcon sx={{ fontSize: '1.2rem' }} /> Logout
                            </button>
                        )}
                    </div>
                </Box>
            </Drawer>
        </>
    );
}
