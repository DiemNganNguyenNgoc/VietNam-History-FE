import React, { useState } from "react";
import "./SortBtn.css";

const SortBtn = ({ setFilterOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);
    const [hoveredOption, setHoveredOption] = useState(null);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setFilterOption(option); // Truyền giá trị "New" hoặc "Popular" về TagsPage
    };

  return (
    <div className="container">
      <button className="button">
        {["Newest", "Active",  "Unanswered"].map((option, index) => (
          <React.Fragment key={index}>
            <span
              className={`options ${
                selectedOption === option ? "selectedOption" : ""
              } ${hoveredOption === option ? "optionHover" : ""}`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {option}
            </span>
            {index < 3 && <div className="separator" />}
          </React.Fragment>
        ))}
      </button>
    </div>
  );
};

export default SortBtn;
