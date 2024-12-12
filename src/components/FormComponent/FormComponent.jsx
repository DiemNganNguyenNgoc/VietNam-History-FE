import React from "react";

const FormComponent = (props) => {
  const handleOnChangeInput = (e) => {
    props.onChange(e); // Truyền toàn bộ event thay vì chỉ value
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label
        className="form-label"
        style={{ display: "block", marginBottom: "5px", fontSize: "16px" }}
      >
        {props.label}
      </label>
      <input
        name={props.name} // Đảm bảo `name` được truyền vào
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        style={{
          padding: "0 20px",
          backgroundColor: "#F2F5FF",
          fontSize: "16px",
          width: "100%",
          height: "35px",
          border: "none",
          borderRadius: "10px",
        }}
        onChange={handleOnChangeInput}
      />
    </div>
  );
};

export default FormComponent;
