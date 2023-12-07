import React from "react";
import LoginWidget from "components/shared/LoginWidget/LoginWidget";

const LoginPage = () => {
  return (
    <div>
      <LoginWidget
        botName="GrinderyDevTestBot"
        dataOnauth={(user) => {
          console.log("user", user);
        }}
      />
    </div>
  );
};

export default LoginPage;
