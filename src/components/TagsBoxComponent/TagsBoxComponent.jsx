import React from 'react';
import './TagsBoxComponent.css';

const TagsBoxComponent = ({ tagsname, description, quantity }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title text-primary mb-0">{tagsname}</h5>
        </div>
        <p className="card-text text-muted" style={{ fontSize: "14px" }}>
          {description}
        </p>
        <span className="text-secondary" style={{ fontSize: "13px" }}>
          {quantity} questions
        </span>
      </div>
    </div>
  );
};

export default TagsBoxComponent;
