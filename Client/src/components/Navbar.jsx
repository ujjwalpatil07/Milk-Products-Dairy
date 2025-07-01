import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import {
    Box, Drawer, Avatar, IconButton, Badge, Tooltip,
    Dialog,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CallIcon from '@mui/icons-material/Call';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import logoDarkMode from "../assets/logoDarkMode.png";
import logoLightMode from "../assets/logoLightMode.png";
import { ThemeContext } from '../context/ThemeProvider';
import { AdminAuthContext, UserAuthContext } from "../context/AuthProvider"
import { CartContext } from '../context/CartProvider';
import { UserOrderContext } from '../context/UserOrderProvider';
import { Bell, X } from 'lucide-react';
import Slide from '@mui/material/Slide';
import { removeUserNotification } from '../services/userProfileService';
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Navbar() {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const loginUser = localStorage.getItem("User");

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { authUser, handleUserLogout, setOpenLoginDialog } = useContext(UserAuthContext);
    const { authAdmin, handleAdminLogout } = useContext(AdminAuthContext);
    const { cartItems } = useContext(CartContext);
    const { notification, setNotification } = useContext(UserOrderContext);
    const [open, setOpen] = useState(false);
    const [notificationLoadingIndex, setNotificationLoadingIndex] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [notificationDialog, setNotificationDialog] = useState(false);
    const prevCountRef = useRef(notification.length);

    useEffect(() => {
        if (notification.length > prevCountRef.current) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 2600);
        }
        prevCountRef.current = notification.length;
    }, [notification.length]);

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const linkStyle = "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer";
    const activeLinkStyle = "bg-gray-500/20 dark:bg-[#00000091] dark:text-white";

    const navItems = [
        { label: 'Home', icon: <HomeIcon sx={{ fontSize: '1.2rem' }} />, path: '/home' },
        { label: 'Products', icon: <StorefrontIcon sx={{ fontSize: '1.2rem' }} />, path: '/products' },
        { label: 'About Us', icon: <Diversity3Icon sx={{ fontSize: '1.2rem' }} />, path: '/about' },
        { label: 'Contact Us', icon: <CallIcon sx={{ fontSize: '1.2rem' }} />, path: '/contact-us' },
    ];

    // const handleLogout = () => {
    //     setOpen(false);
    //     handleUserLogout();
    //     setOpenLoginDialog(true);
    //     enqueueSnackbar("User Logged Out Successfully", { variant: "success" });
    //     navigate("/");
    // }

    // const adminLogout = () => {
    //     setOpen(false);
    //     handleAdminLogout();
    //     setOpenLoginDialog(true);
    //     enqueueSnackbar("Admin Logged Out Successfully", { variant: "success" });
    //     navigate("/");
    // }

    const handleUserCart = () => {
        setOpen(false);
        if (!authUser) {
            setOpenLoginDialog(true);
            enqueueSnackbar("You are not logged in.", { variant: "error" });
            return;
        }

        navigate("/cart");
    }

    const handleRemoveNotification = async (index, mode) => {

        if (!authUser?._id) {
            enqueueSnackbar("Please login to manage notifications.", { variant: "warning" });
            return;
        }

        if (mode === "all") {
            setNotificationLoadingIndex("all");
        } else {
            setNotificationLoadingIndex(index);
        }

        try {
            const res = await removeUserNotification(authUser?._id, mode, index);
            if (res?.success) {
                if (mode === "all") {
                    setNotification([]);
                    enqueueSnackbar(res?.message || "Remove notification.", { variant: "success" });
                } else if (mode === "index") {
                    setNotification((prev) => prev.filter((_, i) => i !== index));
                    enqueueSnackbar(res?.message || "Remove all notifications.", { variant: "success" });
                }
            } else {
                enqueueSnackbar(res?.message || "Failed to remove notification.", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(error?.response?.data?.message || "Server error while removing notification.", { variant: "error" });
        } finally {
            setNotificationLoadingIndex(null);
        }
    };

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
                            className="h-10 sm:h-12 object-cover rounded-md"
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
                    <Tooltip title="Cart">
                        <button onClick={handleUserCart}>
                            <div className="rounded-lg px-2 py-1 bg-[#FDE12D] flex items-center shadow-md">
                                <ShoppingCartIcon className="text-gray-700 mt-1" sx={{ fontSize: "1.2rem" }} />
                                <span className='ps-1 font-semibold text-lg text-gray-700'>{cartItems?.length || 0}</span>
                            </div>
                        </button>
                    </Tooltip>

                    <div className="relative inline-block">
                        <button
                            onClick={() => setNotificationDialog(true)}
                            className="p-2.5 rounded-full hover:bg-gray-500/20 dark:hover:bg-[#00000090] transition relative"
                        >
                            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            {(notification?.length > 0 && loginUser) && (
                                <span
                                    className={`absolute top-0 right-0 font-bold px-1.5 h-fit bg-red-500 text-white rounded-md text-[12px] transition-all duration-300 ${animate ? "animate-bounce" : ""}`}
                                >
                                    {notification.length}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className='hidden sm:flex bg-gray-500/10 hover:bg-gray-500/20 dark:bg-[#00000050] dark:hover:bg-[#00000090] rounded-full'>
                        <IconButton onClick={toggleTheme}>
                            {theme === 'light'
                                ? <DarkModeIcon className="text-gray-700" />
                                : <LightModeIcon className="text-gray-300" />
                            }
                        </IconButton>
                    </div>

                    {authUser ? (
                        <Link to={`/user-profile`} sx={{ padding: "0px" }}>
                            <Avatar alt={authUser?.firstName} src={authUser?.photo} />
                        </Link>
                    ) : (
                        <div className='space-x-2 flex'>
                            <button onClick={() => setOpenLoginDialog(true)} className={`text-white bg-[#843E71] px-3 py-[0.4rem] rounded-sm`}>
                                Login
                            </button>
                            <Link to="/signup" className={`hidden sm:flex border text-[#843E71] border-[#843E71] dark:text-white dark:border-gray-500 px-3 py-[0.4rem] rounded-sm`}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <Drawer open={open} onClose={toggleDrawer(false)} >
                <Box className={`w-64 p-4 flex flex-col gap-4 h-full overflow-auto bg-gray-100 text-black dark:bg-[#282828] dark:text-white'}`}>
                    <Link to="/">
                        <img
                            src={theme === 'light' ? logoLightMode : logoDarkMode}
                            alt="logo"
                            loading='lazy'
                            className="h-12 sm:h-12 object-cover rounded-md"
                        />
                    </Link>

                    <hr className='text-gray-500/40' />

                    <div className='flex-1 space-y-4'>

                        {navItems.map((item, idx) =>
                            <Link key={idx * 0.9} onClick={toggleDrawer(false)} to={item.path} className={linkStyle}>
                                {item.icon} {item.label}
                            </Link>
                        )}
                    </div>

                    <hr className='text-gray-500/40' />


                    <div className='space-y-4'>

                        <button onClick={toggleTheme} className={linkStyle}>
                            {theme === 'light'
                                ? <DarkModeIcon sx={{ fontSize: '1.2rem' }} />
                                : <LightModeIcon sx={{ fontSize: '1.2rem' }} />
                            }
                            <span>Theme</span>
                        </button>

                        <button onClick={handleUserCart} className={linkStyle}>
                            <Badge badgeContent={cartItems?.length || 0} color="primary">
                                <ShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
                            </Badge>
                            My Orders
                        </button>

                        {!authUser && !authAdmin ? (
                            <Link to="/login" onClick={toggleDrawer(false)} className={linkStyle}>
                                <LoginIcon sx={{ fontSize: '1.2rem' }} /> Login
                            </Link>
                        ) : (
                            <button
                                onClick={() => {
                                    if (authAdmin) {
                                        handleAdminLogout();
                                    } else {
                                        handleUserLogout();
                                    }
                                }}
                                className={linkStyle}
                            >
                                <LogoutIcon sx={{ fontSize: '1.2rem' }} /> Logout
                            </button>
                        )}


                    </div>
                </Box>
            </Drawer>

            <Dialog
                open={notificationDialog}
                onClose={() => setNotificationDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                slots={{
                    transition: Transition,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            position: 'absolute',
                            top: 75,
                            m: 0,
                            maxHeight: "300px",
                            backgroundColor: theme === "dark" ? "#0f0f0f" : "#ffffff",
                            // Responsive right and width
                            right: {
                                xs: 30,      // right: 0 on small screens
                                sm: 100,      // right: 0 on small-medium screens
                                md: 150     // right: 150px on medium and above
                            },
                            width: {
                                xs: '300px', // width: 300px on small screens
                                sm: '300px',
                                md: '350px'  // width: 350px on medium and above
                            }
                        },
                    },
                }}
                fullWidth
            >

                <div className="text-black dark:text-white">
                    <div className="sticky top-0 z-10 backdrop-blur bg-white/30 dark:bg-[#2f2f2f]/30 px-3 py-2 flex items-center justify-between rounded-t">
                        <h2 className="text-lg font-semibold">Notifications</h2>
                        {notification.length > 0 && (
                            <button
                                disabled={notificationLoadingIndex}
                                onClick={() => handleRemoveNotification(-1, "all")}
                                className="text-xs text-red-500 hover:underline disabled:cursor-not-allowed"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {notification.length === 0 ? (
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 px-3">
                            🎉 You're all caught up! No new notifications.
                        </div>
                    ) : (
                        <ul className="space-y-3 px-3 py-3">
                            {notification.map((item, idx) => (
                                <li
                                    key={idx + item.title}
                                    className="bg-gray-100 dark:bg-gray-500/20 p-3 rounded-md shadow-sm relative"
                                >

                                    <div className='flex justify-between items-center'>
                                        <p className="font-medium text-sm pr-5">{item?.title}</p>

                                        <button
                                            disabled={notificationLoadingIndex !== null}
                                            onClick={() => handleRemoveNotification(idx, "index")}
                                            className="text-gray-400 hover:text-red-500 text-sm disabled:cursor-not-allowed"
                                            title="Clear"
                                        >
                                            {notificationLoadingIndex === idx ? (
                                                <div className="w-3 h-3 border-[2px] border-t-transparent border-gray-500 rounded-full animate-spin" />
                                            ) : (
                                                <X size={14} />
                                            )}
                                        </button>

                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">
                                        {item?.description}
                                    </p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-right">
                                        {formatDistanceToNow(new Date(item?.date), { addSuffix: true })}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Dialog>
        </>
    );
}