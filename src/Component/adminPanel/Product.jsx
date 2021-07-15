import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
const { Option } = Select;
const Product = ({ array }) => {
  let list = array.map((item, i) => <Card key={i} obj={item} />);
  return (
    <div>
      <HeaderProduct />
      <div style={styles.cardList}>{list}</div>
    </div>
  );
};
const Card = ({ obj }) => {
  console.log(obj);
  return (
    <div className="item">
      <img src={obj.upload} className="w-100" />
      <strong>{obj.title}</strong>
      <p>{obj.prise}</p>
    </div>
  );
};
const HeaderProduct = () => {
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
    console.log(values);
    axios.post("/api/product/add", { ...values, upload: values.upload[0].thumbUrl }).then((res) => {
      setIsModalVisible(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <>
      <header style={{ display: "flex", justifyContent: "start", marginBottom: 25 }}>
        <Button type="primary" onClick={showModal}>
          Primary Button
        </Button>
      </header>
      <Modal footer={false} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          <Form.Item
            label="Название"
            name="title"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Цена"
            name="prise"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите цену!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Тип"
            name="type"
            rules={[
              {
                required: true,
                message: "Пожалуйста, ввеберите тип!",
              },
            ]}
          >
            <Select>
              <Option value="type1">type1</Option>
              <Option value="type2">type2</Option>
              <Option value="type3">type3</Option>
              <Option value="type4">type4</Option>
            </Select>
          </Form.Item>
          <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile} extra="file">
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
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
      </Modal>
    </>
  );
};
const styles = {
  cardList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  },
};
export default Product;
