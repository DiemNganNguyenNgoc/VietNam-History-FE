import React, { useState } from "react";

const ButtonComponent = ({ textButton, icon, ...rests }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-primary"
      style={{
        fontSize: '16px',
        backgroundColor: hover ? '#336699' : '#003366',
        color: '#FFFFFF',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span>{textButton}</span>
      {icon && <span style={{ fontSize: '20px', marginLeft: '8px' }}>{icon}</span>}
    </button>
  );
};

export default ButtonComponent;
