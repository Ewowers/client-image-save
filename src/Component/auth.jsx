import React, { useState, useEffect } from "react";
import { Button, Modal, Tabs, Form, Input } from "antd";
import axios from "axios";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
const Auth = () => {
  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [isAuthorization, isSetAuthorization] = useState(false);
  let [user, setUser] = useState({});
  useEffect(() => {
    axios.post("/api/auth/onload").then((res) => {
      if (res.data.status) {
        isSetAuthorization(true);
        setUser(res.data.user);
        isSetAuthorization(true);
      }
    });
  }, []);

  const out = () => {
    axios.post("/api/auth/out").then((res) => {
      isSetAuthorization(false);
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    isSetAuthorization(true);
  };
  const auths = () => {
    isSetAuthorization(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button onClick={showModal}>
        <UserOutlined />
        Авторизация/Регистрация
      </Button>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={800}
      >
        {!isAuthorization ? (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Авторизация" key="1">
              <Authorization auths={auths} />
            </TabPane>
            <TabPane tab="Регистрация" key="2">
              <Registration />
            </TabPane>
          </Tabs>
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>Hello {user.name}</h2>
            <Button onClick={out}>
              <LogoutOutlined /> Выйти
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

const Authorization = ({ auths }) => {
  let [eror, setEror] = useState("");
  const onFinish = (values) => {
    axios.post("/api/auth/authorization", values).then((response) => {
      if (!response.data.status) setEror(response.data.message);
      else auths();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
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
      <h1>{eror}</h1>
      <Form.Item
        label="Логин"
        name="name"
        rules={[
          {
            required: true,
            message: "Заполните логин!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Заполните пороль",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 19,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const Registration = () => {
  let [eror, setEror] = useState("");
  const onFinish = (values) => {
    axios.post("/api/auth/registration", values).then((response) => {
      if (!response.data.status) setEror(response.data.message);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
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
      <h1 style={{ textAlign: "center", color: "red" }}>{eror}</h1>
      <Form.Item
        label="Логин"
        name="name"
        rules={[
          {
            required: true,
            message: "Заполните логин",
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
            message: "Заполните логин",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Auth;
