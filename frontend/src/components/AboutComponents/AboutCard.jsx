import React from "react";
import PropTypes from "prop-types";

export default function AboutCard({ title, description, image, reverse }) {
    return (
        <div
            className={`flex flex-col md:flex-row items-center gap-8 my-20 ${reverse ? "md:flex-row-reverse" : ""}`}
        >
            <div className="w-full md:w-1/2 px-4">
                <img
                    src={image}
                    alt={title}
                    className="rounded-lg w-full h-full object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

AboutCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    reverse: PropTypes.bool,
};
