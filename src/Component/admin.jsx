import React from "react";
import { Layout, Menu } from "antd";
import { DropboxOutlined, UserOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";
import { Switch, Route, Link } from "react-router-dom";
import Users from "./adminPanel/Users";
import Product from "./adminPanel/Product";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Admin = () => {
  const state = () => undefined;
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
          <SubMenu key="sub1" icon={<UserOutlined />} title="User role">
            <Menu.Item key="2">
              <Link to="/admin/user=all" onClick={state}>
                All
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/user=admin" onClick={state}>
                Admin
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/user=user" onClick={state}>
                Users
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<DropboxOutlined />} title="User role">
            <Menu.Item key="5">
              <Link to="/admin/product=all" onClick={state}>
                All
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/admin/product=product_1" onClick={state}>
                product 1
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/admin/product=product_2" onClick={state}>
                product 2
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/admin/product=product_3" onClick={state}>
                product 3
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/admin/product=product_4" onClick={state}>
                product 4
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Switch>
              <Route path="/admin" exact>
                <h1>is home</h1>
              </Route>
              <Route path="/admin/user=:slug">
                <Users state={state} />
              </Route>
              <Route path="/admin/product=:slug">
                <Product state={state} />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
