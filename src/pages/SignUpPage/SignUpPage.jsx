import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Styles } from "../../style";

const SignUpPage = () => {
  return (
    <div
      className="signup-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "120vh",
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
          className="title title_signup"
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            color: "#003366",
          }}
        >
          SIGN UP
        </h1>
        <form
          className="signup__form"
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
            label="Email"
            type="email"
            placeholder="Enter your email"
          ></FormComponent>

          <FormComponent
            id="passwordInput"
            label="Password"
            type="password"
            placeholder="Enter your password"
          ></FormComponent>

          <FormComponent
            id="confirmPasswordInput"
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
          ></FormComponent>

          <FormComponent
            id="phoneInput"
            label="Phone number"
            type="tel"
            placeholder="Enter your phone number"
          ></FormComponent>

          <FormComponent
            id="birthInput"
            label="Birthday"
            type="date"
            placeholder="Pick your birthday"
          ></FormComponent>

          <FormComponent
            id="addressInput"
            label="Address"
            type="text"
            placeholder="Enter your address"
          ></FormComponent>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <ButtonComponent textButton="Sign Up" />
          </div>
        </form>
        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
            color: "#333",
          }}
        >
          You already have an account?{" "}
          <a
            className="text-decoration-underline"
            href="./login"
            style={{
              color: "#003366",
              textDecoration: "none",
              fontStyle: "italic",
            }}
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
