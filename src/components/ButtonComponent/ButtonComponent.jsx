import React from "react";

const ButtonComponent = (props) => {
  return (
    <button
      className="btn btn-primary"
      style={{
        height: "40px",
        width: "auto",
      }}
    >
      {props.children}
    </button>
  );
};

export default ButtonComponent;
