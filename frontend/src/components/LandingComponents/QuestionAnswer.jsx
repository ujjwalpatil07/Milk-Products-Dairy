import { useState } from "react";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from "@mui/icons-material";
import PropTypes from "prop-types";

export default function QuestionAnswer({ question, answer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (!question || !answer) return null;

  return (
    <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] transition-all duration-300 shadow-sm">
      <button
        onClick={toggleExpand}
        className="w-full flex justify-between items-center p-4 text-left bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls={`faq-content-${question}`}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {question}
        </h3>
        {isExpanded ? (
          <ExpandLessIcon className="text-gray-500 dark:text-gray-400" />
        ) : (
          <ExpandMoreIcon className="text-gray-500 dark:text-gray-400" />
        )}
      </button>

      <div
        id={`faq-content-${question}`}
        className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-4 text-gray-600 dark:text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  );
}

QuestionAnswer.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
