import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Button, Avatar, Dropdown } from "antd";
import { MenuProps } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <p>User 1</p>,
  },
  {
    key: "2",
    label: (
      <Button type="primary" danger>
        Logout
      </Button>
    ),
  },
];

const FullLayout = ({
  sidebarMenu,
}: {
  sidebarMenu: Array<{ label: string; link: string }>;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar sidebarCollaped={collapsed} sidebarMenu={sidebarMenu} />
      <Layout>
        <Header
          style={{
            padding: "0 20px",
            backgroundColor: "#FDD671",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar
              style={{ cursor: "pointer" }}
              size="large"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>
        <Content style={{ padding: "41px 28px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default FullLayout;
