import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormComponent from "../../components/FormComponent/FormComponent";

const SignUpPage = () => {
  return (
    <div>
      <h1 className="signup__title">SIGN UP</h1>
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
        type="phone"
        placeholder="Enter your phone"
      ></FormComponent>

      <FormComponent
        id="birthInput"
        label="Birthday"
        type="birthday"
        placeholder="Pick your birthday"
      ></FormComponent>

      <FormComponent
        id="addressInput"
        label="Address"
        type="address"
        placeholder="Enter your address"
      ></FormComponent>

      <ButtonComponent>Sign Up</ButtonComponent>
    </div>
  );
};

export default SignUpPage;
