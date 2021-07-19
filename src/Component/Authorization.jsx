import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Tabs } from "antd";
const { TabPane } = Tabs;
const Authorization = () => {
  let [url, setUrl] = useState(null);
  let [message, setMessage] = useState("");
  let [messageAuth, setMessageAuth] = useState("");
  let [noRegistr, setNoRegistr] = useState(false);
  const auth = (body) => {
    axios.post("/api/auth/authorization", body).then((response) => {
      console.log(response.data);
      if (response.data.status) setUrl(response.data.url);
      else {
        console.log(response.data.message);
        setMessageAuth(response.data.message);
      }
    });
  };
  const registration = (body) => {
    axios.post("/api/auth/registration", body).then((response) => {
      if (response.data.status) setNoRegistr(true);
      else setMessage(response.data.message);
    });
  };
  useEffect(() => {
    axios.post("/api/auth/onload").then((response) => {
      if (response.data.status) setUrl("/" + response.data.url);
      if (response.data.registr) setNoRegistr(true);
    });
  }, []);
  return (
    <div style={style.body}>
      {url === null ? "" : <Redirect to={url} />}
      {noRegistr ? (
        <h1>Ваша заявка принята, ожидайте потвержедния</h1>
      ) : (
        <Tabs defaultActiveKey="1" style={{ width: "25%" }}>
          <TabPane tab="Войти" key="1">
            <Demo auth={auth} messageAuth={messageAuth} />
          </TabPane>
          <TabPane tab="Регистрация" key="2">
            <Registr registration={registration} message={message} />
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};
const Demo = ({ auth, messageAuth }) => {
  const onFinish = (values) => {
    auth(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      style={{ width: "100%" }}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>{messageAuth}</h1>
      <Form.Item
        label="Логин"
        name="name"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя пользователя!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пороль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свой пароль!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

const Registr = ({ registration, message }) => {
  const onFinish = (values) => {
    registration(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      style={{ width: "100%" }}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>{message}</h1>
      <Form.Item
        label="Логин"
        name="name"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя пользователя!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пороль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свой пароль!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
const style = {
  body: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default Authorization;
