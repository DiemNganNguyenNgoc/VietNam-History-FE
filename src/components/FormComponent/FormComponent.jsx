import React from "react";

const TextBoxComponent = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextBoxComponent;
