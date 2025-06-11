import React from "react";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";

export default function TestimonialCard({ userImage, description, name, platform }) {
    return (
        <div className="bg-white dark:bg-gray-700/20 p-6 rounded-lg shadow-md flex flex-col items-center text-center max-w-sm mx-auto">
            <Avatar
                alt={name}
                src={userImage}
                sx={{ width: 72, height: 72, mb: 4, boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}
            />
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                "{description}"
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{platform}</span>
        </div>
    );
};

TestimonialCard.propTypes = {
    userImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired
}
