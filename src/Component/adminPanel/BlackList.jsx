import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import axios from "axios";
const BlackList = () => {
  const [banlist, setBanlist] = useState([]);
  const get = () => {
    axios.get("/api/blacklist/").then((response) => setBanlist(response.data));
  };
  useEffect(() => get(), []);
  const razban = (id) => {
    axios.delete("/api/blacklist/" + id).then((res) => get());
  };
  let list = banlist.map((item, i) => <Item key={i} ip={item.ip} id={item._id} razban={razban} />);
  return <>{list}</>;
};
const Item = ({ ip, id, razban }) => {
  return (
    <div style={style.card}>
      <span>{ip}</span>
      <div style={{ display: "flex" }}>
        <Button onClick={() => razban(id)}>Разбанить</Button>
      </div>
    </div>
  );
};
const style = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid",
    padding: 10,
    alignItems: "center",
  },
};
export default BlackList;
