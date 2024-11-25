import React from "react";
import TagsHolder from "../../components/UserTags/TagsHolder";
import "../../css/TagSubTab.css";

const TagSubTab = () => {
  const tagQuantity = 4;
  
  const handleClick = () => {
    alert('Nút đã được nhấn');
  };
  
  return (
    <div className="tag-subtab-container">
      <button 
        onClick={handleClick} 
        className="new-tag-button">
        New Tag
      </button>
      <div className="title">
        <h3>Tags {tagQuantity}</h3>
      </div>
      {/* content */}
      <div className="tag-list">
        <TagsHolder />
      </div>
    </div>
  );
};

export default TagSubTab;
