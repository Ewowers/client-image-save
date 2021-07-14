import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
const UserPanel = ({ array }) => {
  let [users, setUsers] = useState([]);
  let [user, setUser] = useState({});
  let [id, setId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const get = () => {
    axios.get("/api/auth/").then((response) => {
      setUsers(response.data);
    });
  };

  useEffect(() => {
    // get();
    axios.get("/api/auth/").then((res) => console.log(res.data));
  }, []);
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
    axios.put("/api/auth/" + id, user).then((res) => {
      get();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let Card = ({ name, status, id }) => {
    return (
      <div className="item" style={styles.card}>
        <p style={{ margin: 0, display: "flex" }}>
          <span style={{ width: 250, display: "block" }}>
            Логин <strong>{name}</strong>
          </span>
          <span>
            статус <strong>{status}</strong>
          </span>
        </p>
        <div className="btn-list">
          <Button onClick={() => showModal(id)} type="danger">
            изменить
          </Button>
        </div>
      </div>
    );
  };
  let list = array.map((item, i) => <Card name={item.name} status={item.status} key={i} id={item._id} />);
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
            <option value="user">user</option>
          </select>
        </div>
      </Modal>
    </>
  );
};
let Form;
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
