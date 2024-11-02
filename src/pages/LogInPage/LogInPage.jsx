import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormComponent from "../../components/FormComponent/FormComponent";

const LogInPage = () => {
  return (
    <div>
      <h1 className="login__title">LOG IN</h1>
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


      <ButtonComponent>Log In</ButtonComponent>
    </div>
  );
};

export default LogInPage;
