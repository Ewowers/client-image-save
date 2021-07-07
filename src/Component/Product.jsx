import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const styles = {
  cardList: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    margin: 15,
  },
};
const Product = () => {
  let { id } = useParams(); //params id

  let [product, setProduct] = useState([]); //стейт с массивом продуктов
  useEffect(() => {
    //получение продуктов при загрузки страницы
    axios.get(id ? "/api/type=" + id : "/api").then((res) => {
      setProduct(res.data);
    });
  }, []);

  let listCard = product.map((item, i) => {
    // карточка товара
    return (
      <div className="card" key={i} style={styles.card}>
        <img src={item.upload} className="w-100 card-img-top" />
        <div className="card-body">
          <div className="card-title">{item.title}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="cardList" style={styles.cardList}>
      {listCard}
    </div>
  );
};

export default Product;
