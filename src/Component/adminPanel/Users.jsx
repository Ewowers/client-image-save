import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
const UserPanel = () => {
  let Card = ({ name, id }) => {
    return (
      <div className="card">
        <div className="card-body">
          <p style={{ fontSize: 18, textAlign: "center" }}>{name}</p>
        </div>
        <div className="card-footer" style={{ justifyContent: "flex-end", display: "flex" }}>
          <Button type="primary" style={{ marginRight: 5 }} onClick={() => yes(id)}>
            <CheckOutlined />
          </Button>
          <Button type="danger" onClick={() => ban(id)}>
            <CloseOutlined />
          </Button>
        </div>
      </div>
    );
  };
  let [users, setUser] = useState([]);
  let gets = () => {
    axios.get("/api/auth/").then((response) => {
      let arr = response.data;
      arr = arr.map((item, i) => <Card name={item.name} id={item.id} key={i} />);
      setUser(arr);
    });
  };
  const ban = (id) => {
    console.log(id);
    axios.delete("/api/auth/" + id).then((res) => {
      gets();
    });
  };
  const yes = (id) => {
    console.log(id);
    axios.put("/api/auth/" + id).then((res) => {
      gets();
    });
  };
  useEffect(() => {
    gets();
  }, []);

  return <>{users}</>;
};
export default UserPanel;
