import React from "react";
import { ConfigProvider } from "antd";

const CustomTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#343434",
          colorPrimaryBorder: "#000000",
          controlOutline: "#FDD671",
        },
        components: {
          Button: {
            defaultBorderColor: "#000000",
          },
          Menu: {
            itemBg: "#FFFFFF",
            itemSelectedBg: "#FDD671",
            itemActiveBg: "#FDD671",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default CustomTheme;
