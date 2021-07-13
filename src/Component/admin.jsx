import React from "react";
import { Layout, Menu } from "antd";
import { DropboxOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Switch, Route, Link } from "react-router-dom";
import Users from "./adminPanel/Users";
import Product from "./adminPanel/Product";
const { Content, Footer, Sider } = Layout;
const Admin = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin">Главная панель</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/user">Юзеры</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DropboxOutlined />}>
            <Link to="/admin/product">Продукция</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Switch>
              <Route path="/admin" exact>
                <h1>is home</h1>
              </Route>
              <Route path="/admin/user">
                <Users />
              </Route>
              <Route path="/admin/product">
                <Product />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
