import React from "react";
import LoginForm from "../fragments/LoginForm";

const Login = () => {
  return (
    <div style={ContentStyle}>
      <div style={ContainerStyle}>
        <div style={FormStyle}>
          <LoginForm />
        </div>
        <div style={{ border: "1px solid black" }}></div>
        <div style={CoverStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "60%",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}
              src="./assets/logo.png"
            />
            <img src="./assets/tokodizital.png" />
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: "12px" }}>
              in colaboration with
            </p>
            <img src="./assets/Image GoTo.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContainerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "2px solid black",
  borderRadius: 15,
  display: "flex",
  minHeight: "70vh",
  margin: 20,
};

const ContentStyle: React.CSSProperties = {
  backgroundColor: "#FDD671",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const FormStyle: React.CSSProperties = {
  margin: 20,
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const CoverStyle: React.CSSProperties = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "50px 0",
};
export default Login;
