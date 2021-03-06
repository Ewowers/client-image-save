import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { DropboxOutlined, UserOutlined, HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Users from "./adminPanel/Users";
import Product from "./adminPanel/Product";
import axios from "axios";
import BlackList from "./adminPanel/BlackList";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const Admin = () => {
  const [url, setUrl] = useState(false);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const getProduct = (slug) => {
    let url = "/api/product/type=" + slug;
    axios.get(url).then((response) => {
      setProduct(response.data);
    });
  };
  useEffect(
    () =>
      axios.post("/api/auth/important").then((res) => {
        setUser(res.data);
      }),
    []
  );

  const getUsers = (slug) => {
    let url;
    if (slug === "all") url = "/api/auth";
    else url = "/api/auth/type=" + slug;
    axios.get(url).then((response) => {
      setUsers(response.data);
      console.log("url:", url);
    });
  };
  const out = () => {
    axios.post("/api/auth/out").then((res) => {
      if (res.data) setUrl(true);
    });
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Button onClick={out} type="danger" style={{ position: "fixed", bottom: 15, left: 15, zIndex: 2 }}>
        Выход
      </Button>
      {url ? <Redirect to="/" /> : null}
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
              <Link to="/admin/user=all" onClick={() => getUsers("all")}>
                All
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/user=admin" onClick={() => getUsers("admin")}>
                Админ
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/user=moder" onClick={() => getUsers("moder")}>
                Модераторы
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/admin/user=user" onClick={() => getUsers("user")}>
                Пользователи
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/admin/user=null" onClick={() => getUsers("nouser")}>
                Ожидающие потвержедния
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<DropboxOutlined />} title="User role">
            <Menu.Item key="7">
              <Link to="/admin/product=all" onClick={() => getProduct("all")}>
                All
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/admin/product=product_1" onClick={() => getProduct("product_1")}>
                product 1
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/admin/product=product_2" onClick={() => getProduct("product_2")}>
                product 2
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/admin/product=product_3" onClick={() => getProduct("product_3")}>
                product 3
              </Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/admin/product=product_4" onClick={() => getProduct("product_4")}>
                product 4
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="12" icon={<UnorderedListOutlined />}>
            <Link to="/admin/blackList">Black list</Link>
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
              <Route path="/admin/user=:slug">
                <Users array={users} important={user} />
              </Route>
              <Route path="/admin/product=:slug">
                <Product array={product} />
              </Route>
              <Route path="/admin/blackList">
                <BlackList />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
