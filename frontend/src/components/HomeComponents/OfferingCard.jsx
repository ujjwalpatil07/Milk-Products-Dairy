import PropTypes from "prop-types";
import EastIcon from '@mui/icons-material/East';
import { Link } from "react-router-dom";

export default function OfferingCard({ image, title, description }) {
    return (
        <div className="overflow-hidden transition md:hover:scale-105 duration-300">
            <img src={image} alt={title} className="w-full h-52 object-cover rounded-lg" />
            <div className="p-4 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-2">{description}</p>

                <Link to="/products" className="gap-2 text-blue-500 hover:text-blue-600 hover:underline">
                    Shop <EastIcon sx={{ fontSize: "1.1rem" }}/>
                </Link>
            </div>
        </div>
    );
}

OfferingCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
