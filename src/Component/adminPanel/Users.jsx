import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
const UserPanel = ({ array, important }) => {
  console.log(array);
  let num = important;
  let [users, setUsers] = useState([]);
  let [user, setUser] = useState({});
  let [id, setId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const get = () => {
    axios.get("/api/auth/").then((response) => {
      setUsers(response.data);
    });
  };

  const showModal = (id) => {
    axios.post("/api/auth/user/" + id).then((res) => {
      setUser(res.data);
      setId(res.data._id);
      setIsModalVisible(true);
    });
  };
  let handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleOk = () => {
    console.log(user);
    setIsModalVisible(false);
    console.log(id);
    axios.put("/api/auth/" + id, user).then((res) => {
      get();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const ban = (id) => {
    axios.post("/api/blacklist/add", { id: id });
  };
  const delit = (id) => {
    axios.delete("/api/auth/" + id);
  };
  let Card = ({ name, status, id, important, ip }) => {
    return (
      <div className="item" style={styles.card}>
        <p style={{ margin: 0, display: "flex" }}>
          <span style={{ width: 250, display: "block" }}>
            Логин <strong>{name}</strong>
          </span>
          <span style={{ width: 250, display: "block" }}>
            статус <strong>{status === "nouser" ? "" : status}</strong>
          </span>
          <span>
            ip: <strong>{ip ? ip : null}</strong>
          </span>
        </p>
        {important <= num.important ? (
          <div className="btn-list">
            <Button type="danger" onClick={() => ban(ip)}>
              Бан
            </Button>
            <Button type="danger" onClick={() => delit(id)} style={{ margin: "0 10px" }}>
              Удалить
            </Button>
            <Button onClick={() => showModal(id)} type="danger">
              изменить
            </Button>
          </div>
        ) : null}
      </div>
    );
  };
  let list = array.map((item, i) => {
    return (
      <Card name={item.name} status={item.status} key={i} id={item._id} important={item.important} ip={item?.ip} />
    );
  });
  return (
    <>
      {list}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="mb-3">
          <label htmlFor="name">Логин</label>
          <input className="form-control" id="name" value={user.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Пороль</label>
          <input className="form-control" id="password" value={user.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="status">Статус</label>
          <select id="status" className="form-select" value={user.status} onChange={handleChange}>
            <option value="admin">admin</option>
            <option value="moder">moder</option>
            <option value="user">user</option>
            <option value="nouser"></option>
          </select>
        </div>
      </Modal>
    </>
  );
};
const styles = {
  card: {
    width: "100%",
    padding: 5,
    border: "1px solid",
    marginBottom: 5,
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
export default UserPanel;
