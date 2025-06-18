import PropTypes from "prop-types";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../context/AuthProvider";
import { productLike } from "../../services/productServices";

export default function RecommendedCard({ id, image, name, description, likes = [], rating }) {

  const { authUser } = useContext(UserAuthContext);

  const [localLikes, setLocalLikes] = useState(likes);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLikeProduct = async (productId) => {
    if (!authUser?._id) {
      toast.error("Please log in to like products.");
      return;
    }

    if (localLikes.includes(authUser._id)) {
      toast.info("You already liked this product.");
      return;
    }

    setLikeLoading(true);

    try {
      const { message, updatedLikes } = await productLike(productId, authUser._id);
      setLocalLikes(updatedLikes);
      toast.success(message || "You liked the product!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to like product.");
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="rounded-lg h-fit overflow-hidden relative shadow-md bg-white dark:bg-gray-500/20 transition-colors duration-300">
      <div className="relative h-44 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        {(!image || image === "null") ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <EmojiFoodBeverageIcon className="text-gray-400 dark:text-gray-300 text-5xl" />
            <Link to={`/product-details/${slugify(name)}`}>
              <span className="text-gray-500 dark:text-gray-300 text-sm font-medium hover:text-blue-500">
                {name}
              </span>
            </Link>
          </div>
        ) : (
          <Link to={`/product-details/${slugify(name)}`} className="w-full" >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </Link>
        )}

        {!localLikes?.includes(authUser?._id) && (
          <button
            onClick={() => handleLikeProduct(id)}
            className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-red-500 hover:bg-white/50 dark:bg-gray-500/50 transition-colors cursor-pointer"
            disabled={likeLoading}
          >
            {likeLoading ? (
              <div className="w-4 h-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div>
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: "1.3rem" }} />
            )}
          </button>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product-details/${slugify(name)}`} className="text-lg font-bold mb-2 dark:text-white hover:text-blue-500 pb-1">{name}</Link>

        <div className="grid grid-cols-2 items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <StarIcon className="text-[#FE8C00]" sx={{ fontSize: "1.3rem" }} />
            <span className="text-sm dark:text-gray-300">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <FavoriteBorderIcon className="text-[#FE8C00]" sx={{ fontSize: "1.3rem" }} />
            <span className="text-sm text-gray-500 dark:text-gray-400">{localLikes?.length || 0}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        <div className="pt-2 flex justify-end">
          <Link to={`/product-details/${slugify(name)}`} className="text-sm border border-[#843E71] text-[#843E71] px-3 py-1 rounded-full ">View Product</Link>
        </div>
      </div>
    </div>
  );
}


RecommendedCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  likes: PropTypes.array,
  rating: PropTypes.string.isRequired,
};
