import { Typography, Menu, Layout } from "antd";

const Sidebar = ({
  sidebarCollaped,
  sidebarMenu,
}: {
  sidebarCollaped: boolean;
  sidebarMenu: Array<{ label: string; link: string }>;
}) => {
  const { Sider } = Layout;
  return (
    <Sider
      style={{ backgroundColor: "white" }}
      trigger={null}
      collapsible
      collapsed={sidebarCollaped}
    >
      <div style={{ display: "flex", alignItems: "center", margin: 10 }}>
        <img
          style={{
            width: sidebarCollaped ? "100%" : "30%",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
          src="./assets/logo.png"
        />
        <Typography.Title
          style={{ display: sidebarCollaped ? "none" : "block" }}
          level={4}
        >
          JAJAN PANEL
        </Typography.Title>
      </div>
      <div className="demo-logo-vertical" />
      <Menu
        style={{ backgroundColor: "white" }}
        mode="inline"
        defaultSelectedKeys={[window.location.pathname]}
        items={sidebarMenu.map((sidebar) => {
          return {
            key: sidebar.link,
            label: sidebar.label,
            onClick: () => (window.location.href = sidebar.link),
          };
        })}
      />
    </Sider>
  );
};

export default Sidebar;
