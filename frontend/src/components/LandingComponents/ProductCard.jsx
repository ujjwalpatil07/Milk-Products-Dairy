import PropTypes from "prop-types";
import CheckIcon from '@mui/icons-material/Check';

export default function ProductCard({ title, description, image, features }) {

  return (
    <>
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <ul className="space-y-2 mt-3">
          {features?.map((feature, i) => (
            <li
              key={i * 0.2}
              className="flex items-start text-gray-700 dark:text-gray-200"
            >
              <span className="mr-2 text-amber-500 dark:text-amber-300">
                <CheckIcon />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </>

  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
};
