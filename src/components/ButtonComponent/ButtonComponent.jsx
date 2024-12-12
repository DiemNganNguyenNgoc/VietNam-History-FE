import React, { useState } from "react";

const ButtonComponent = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      type={props.type || "button"} // Mặc định là "button", nhưng có thể truyền "submit"
      className="btn btn-primary"
      style={{
        fontSize: "16px",
        backgroundColor: hover ? "#336699" : "#003366",
        color: "#FFFFFF",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <span>{props.textButton}</span>
      {props.icon && (
        <span style={{ fontSize: "20px", marginLeft: "8px" }}>
          {props.icon}
        </span>
      )}
    </button>
  );
};

export default ButtonComponent;
