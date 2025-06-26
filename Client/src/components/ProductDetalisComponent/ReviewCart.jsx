import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { UserAuthContext } from "../../context/AuthProvider"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import {
    ThumbUpOffAlt,
    ThumbDownOffAlt,
    ThumbUpAlt,
    Edit,
    Delete,
    Save,
    Close,
} from "@mui/icons-material";
import Slide from '@mui/material/Slide';

import { addProductReviewLike, deleteReview, editReview } from "../../services/productServices";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ReviewCard({ id, productId, username, image, message, date, rating, likes, postedUserId }) {

    const { authUser } = useContext(UserAuthContext);

    const [localLikes, setLocalLikes] = useState(likes || []);
    const [likeLoading, setLikeLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editMessage, setEditMessage] = useState(message);
    const [editRating, setEditRating] = useState(rating);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const hasLiked = localLikes.includes(authUser?._id);
    const isReviewOwner = authUser?._id === postedUserId;

    useEffect(() => {
        setLocalLikes(likes || []);
    }, [likes, message]);

    const handleReviewLike = async (reviewId, product_Id) => {

        if (!authUser?._id) {
            toast.error("Please log in to like review.");
            return;
        }

        if (hasLiked) {
            toast.info("You already liked this review.");
            return;
        }

        setLikeLoading(true);

        try {
            const data = await addProductReviewLike(product_Id, reviewId, authUser?._id);
            if (data?.success) {
                setLocalLikes(data?.likes);
                toast.success(data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to like review.");
        } finally {
            setLikeLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId, productId) => {
        try {
            setLoading(true);
            const res = await deleteReview(reviewId, productId);
            if (res?.success) {
                toast.success("Review deleted.");
            }
        } catch (err) {
            toast.error(err?.response?.data?.error || "Failed to delete review.");
        } finally {
            setLoading(false);
        }
    }

    const handleSaveEdit = async () => {

        if (!editMessage.trim()) {
            toast.error("Message cannot be empty.");
            return;
        }

        try {
            setLoading(true);
            const res = await editReview(id, editMessage.trim(), editRating);
            if (res?.success) {
                toast.success("Review updated.");
            }
        } catch (err) {
            setEditMessage(message);
            setEditRating(rating);
            toast.error(err?.response?.data?.error || "Failed to update review.");
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    }

    const iconButtonClass = "w-7 h-7 flex items-center justify-center rounded-sm bg-gray-500/10 dark:bg-gray-500/20 transition";

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full p-4 rounded-lg space-y-2 border border-dashed border-gray-400 dark:border-gray-600"
            >

                <Rating
                    value={editRating}
                    readOnly={!isEditing}
                    precision={1}
                    size="small"
                    onChange={(e, val) => setEditRating(val)}
                />

                {isEditing ? (
                    <textarea
                        className="w-full text-sm p-2 rounded-md bg-gray-100 dark:bg-gray-500/10 dark:text-white transition-colors duration-300"
                        value={editMessage}
                        rows={3}
                        onChange={(e) => setEditMessage(e.target.value)}
                    />
                ) : (
                    <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line break-all">
                        {editMessage}
                    </p>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(date).toDateString()}
                </p>

                <div className="flex items-center justify-between pt-2 mt-2">
                    <div className="flex items-center gap-2">
                        <Avatar alt={username} src={image} sx={{ width: 32, height: 32 }} />
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-800 dark:text-white break-all">
                                {username}
                            </span>
                        </div>
                    </div>


                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">

                        {
                            likeLoading
                                ? <div className="w-4 h-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div>
                                : <>
                                    <button
                                        onClick={() => handleReviewLike(id, productId)}
                                        type="button"
                                        className={`${iconButtonClass} ${hasLiked ? "text-[#843E71]" : "hover:text-[#843E71]"}`}
                                    >
                                        {hasLiked ? <ThumbUpAlt fontSize="small" /> : <ThumbUpOffAlt fontSize="small" />}
                                    </button>

                                    <span className="text-sm">{localLikes.length}</span>
                                </>
                        }

                        <div className={`${iconButtonClass} cursor-default opacity-50`}>
                            <ThumbDownOffAlt fontSize="small" />
                        </div>

                        {isReviewOwner && !isEditing && (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className={`${iconButtonClass} hover:text-blue-600`}
                                >
                                    <Edit fontSize="small" />
                                </button>

                                <button
                                    onClick={() => setOpen(true)}
                                    className={`${iconButtonClass} hover:text-red-600`}
                                >
                                    {loading ? <div className="w-4 h-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div> : <Delete fontSize="small" />}
                                </button>
                            </>
                        )}

                        {isReviewOwner && isEditing && (
                            <>
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={loading}
                                    className={`${iconButtonClass} hover:text-green-600 disabled:cursor-not-allowed`}
                                >
                                    {loading ? <div className="w-4 h-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div> : <Save fontSize="small" />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditMessage(message);
                                        setEditRating(rating);
                                    }}
                                    className={`${iconButtonClass} hover:text-gray-500`}
                                >
                                    <Close fontSize="small" />
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </motion.div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                fullWidth={true}
                maxWidth="sm"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className="dark:bg-black/80 dark:text-white">
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <p
                            id="alert-dialog-slide-description"
                            className="text-sm text-gray-800 dark:text-gray-300 line-clamp-2"
                        >
                            Do you want to delete this review?
                        </p>
                        <p className="line-clamp-2">{message}</p>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            handleDeleteReview(id, productId);
                            setOpen(false);
                        }}
                            color="error"
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
}

ReviewCard.propTypes = {
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    postedUserId: PropTypes.string.isRequired
};

