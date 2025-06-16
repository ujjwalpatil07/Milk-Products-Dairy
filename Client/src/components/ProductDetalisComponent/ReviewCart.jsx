import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { UserAuthContext } from "../../context/AuthProvider"

import { Avatar, Rating } from "@mui/material";
import {
    ThumbUpOffAlt,
    ThumbDownOffAlt,
    ThumbUpAlt,
} from "@mui/icons-material";

export default function ReviewCard({ username, image, message, date, rating, likes }) {

    const { authUser } = useContext(UserAuthContext);

    const [localLikes, setLocalLikes] = useState(likes || []);

    const hasLiked = localLikes.includes(authUser?._id);

    useEffect(() => {
        setLocalLikes(likes || []);
    }, [username, likes, message]);

    const toggleLike = () => {
        if (hasLiked) {
            setLocalLikes((prev) => prev.filter((id) => id !== authUser?._id));
        } else {
            setLocalLikes((prev) => [...prev, authUser?._id]);
        }
    };

    return (
        <div className="w-full p-4 rounded-lg space-y-2 border border-dashed border-gray-400 dark:border-gray-600">

            <Rating value={rating} readOnly precision={0.5} size="small" />

            <p className="text-sm text-gray-700 dark:text-gray-200 break-all">{message}</p>
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

                    <button
                        onClick={toggleLike}
                        type="button"
                        className={`flex items-center gap-1 transition ${hasLiked ? "text-[#843E71]" : "hover:text-[#843E71]"
                            }`}
                    >
                        {hasLiked ? (
                            <ThumbUpAlt fontSize="small" />
                        ) : (
                            <ThumbUpOffAlt fontSize="small" />
                        )}
                        <span className="text-sm">{localLikes.length}</span>
                    </button>


                    <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition">
                        <ThumbDownOffAlt fontSize="small" />
                    </div>
                </div>
            </div>
        </div>
    );
}

ReviewCard.propTypes = {
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

