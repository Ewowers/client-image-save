import React, { useState, useEffect } from "react";
import { PageHeader, Button, Modal, Input, Row, Col, Select, Form } from "antd";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import Avatar from "./ava";
const User = () => {
  const [user, setUser] = useState({});
  const [url, setUrl] = useState(false);
  const { slug } = useParams();
  const out = () => {
    axios.post("/api/auth/out").then((response) => {
      setUrl(true);
      console.log(true);
    });
  };
  useEffect(() => {
    console.log(slug);
    axios.post("/api/auth/user/" + slug).then((response) => {
      setUser(response.data);
    });
  }, []);
  return (
    <div className="site-page-header-ghost-wrapper">
      {url ? <Redirect to="/" /> : null}

      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={"Здраствуйте " + user.name}
        extra={[
          <Button key="3">Карзина</Button>,
          <Button key="2">Оформить заказ</Button>,
          <Personal key="1" user={user} out={out} />,
        ]}
      ></PageHeader>
    </div>
  );
};

const Personal = ({ user, out }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    axios.put("/api/auth", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button key="1" type="primary" onClick={showModal}>
        Личный кабинет
      </Button>
      <Modal
        width={1000}
        title="Личный кабинет"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Avatar img={user.ava} />
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={25}>
            <Col span={12}>
              <Form.Item label="Ваш логин" name="name">
                <Input defaultValue={user.name} />
              </Form.Item>
              <Form.Item label="Ваш email" name="email">
                <Input defaultValue={user?.email} />
              </Form.Item>
              <Form.Item label="Ваш телефон" name="phone">
                <Input defaultValue={user?.phone} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ваш адресс" name="address">
                <Input defaultValue={user?.address} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  save
                </Button>
                <Button type="danger" style={{ margin: "0 10px" }} onClick={out}>
                  exit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default User;
