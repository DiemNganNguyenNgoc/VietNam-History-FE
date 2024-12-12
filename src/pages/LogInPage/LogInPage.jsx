import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Styles } from "../../style";
import { useMutation } from "@tanstack/react-query";
import * as AdminService from "../../services/AdminService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showLoading, setShowLoading] = useState(false); // Thêm trạng thái riêng
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const mutation = useMutationHook((data) => AdminService.loginAdmin(data));
  const { data } = mutation;

  // Check if all fields are filled to enable the button
  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, showing loading...");
    setShowLoading(true); // Hiện loading
    // setErrorMessage("");
    mutation.mutate(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          setErrorMessage(""); // Xóa lỗi nếu thành công
          setTimeout(() => {
            setShowLoading(false); // Ẩn loading sau 0.5s
            navigate("/"); // Điều hướng nếu thành công
          }, 500);
        },
        onError: (error) => {
          // console.error("Login failed: ", error);
          // Trích xuất thông báo lỗi chi tiết
          const errorMessage =
            error.message?.message || error.message || "Đăng nhập thất bại.";
          setErrorMessage(errorMessage); // Lưu thông báo lỗi vào trạng thái
          setTimeout(() => setShowLoading(false), 500); // Ẩn loading nếu lỗi
        },
      }
    );
    // console.log("userEmail: ", formData.userEmail, " ", "userPassword: ", formData.userPassword);
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          width: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          className="title title_login"
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#003366",
            fontSize: "25px",
          }}
        >
          LOG IN
        </h1>
        <LoadingComponent isLoading={showLoading}>
          {!showLoading && (
            <form
              onSubmit={handleSubmit}
              className="login__form"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "600px",
                height: "auto",
              }}
            >
              <FormComponent
                id="emailInput"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              ></FormComponent>

              <FormComponent
                id="passwordInput"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              ></FormComponent>

              {/* hiện thông báo lỗi */}
              {errorMessage && (
                <span
                  style={{
                    color: "red",
                    display: "block",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                >
                  {errorMessage}
                </span>
              )}
              <a
                href="#"
                className="forgot-password"
                style={{
                  textAlign: "right",
                  fontSize: "14px",
                  color: "#003366",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <ButtonComponent textButton="Log In" type="submit" />
              </div>
            </form>
          )}
        </LoadingComponent>
        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
            color: "#333",
          }}
        >
          You don't have an account?{" "}
          <a
            className="text-decoration-underline"
            href="./signup"
            style={{
              color: "#003366",
              textDecoration: "none",
              fontStyle: "italic",
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
