import React from "react";

const ButtonComponent = (props) => {
  return <button className="btn btn-primary">{props.children}</button>;
};

export default ButtonComponent;
