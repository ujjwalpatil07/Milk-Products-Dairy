import { useEffect, useState } from "react";
import PropTypes from "prop-types"

export default function NutritionInput({ onChange, value }) {
  const [nutrition, setNutrition] = useState([{ key: "", value: "" }]);

  // Initialize nutrition state from `value` when it changes
  useEffect(() => {
    if (value && typeof value === "object") {
      const parsed = Object.entries(value).map(([key, val]) => ({ key, value: val }));
      setNutrition(parsed.length ? parsed : [{ key: "", value: "" }]);
    }
  }, [value]);

  const handleChange = (index, field, val) => {
    const updated = [...nutrition];
    updated[index][field] = val;
    setNutrition(updated);

    // Convert to object
    const nutritionMap = {};
    updated.forEach((item) => {
      if (item.key && item.value) {
        nutritionMap[item.key] = item.value;
      }
    });
    onChange(nutritionMap);
  };

  const handleAddField = () => {
    setNutrition([...nutrition, { key: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const updated = nutrition.filter((_, i) => i !== index);
    setNutrition(updated);

    const nutritionMap = {};
    updated.forEach((item) => {
      if (item.key && item.value) {
        nutritionMap[item.key] = item.value;
      }
    });
    onChange(nutritionMap);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="key" className="text-gray-700 dark:text-white font-medium">Nutrition Info</label>

      {nutrition.map((item, index) => (
        <div key={index * 0.5} className="flex gap-2 items-center">
          <div className="w-1/2">
            <label htmlFor="key" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Key
            </label>
            <input
              type="text"
              id="key"
              placeholder="e.g. Calories"
              value={item.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="value" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Value
            </label>
            <input
              type="text"
              id="value"
              placeholder="e.g. 100 kcal"
              value={item.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="text-red-500 font-bold px-2"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddField}
        className="w-fit px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        + Add More
      </button>
    </div>
  );
}

NutritionInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object, 
};
