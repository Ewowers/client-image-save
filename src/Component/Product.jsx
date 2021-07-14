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
const Product = ({ state }) => {
  let { slug } = useParams(); //params id

  let [product, setProduct] = useState([]); //стейт с массивом продуктов
  let get = () => {
    axios.get(slug ? "/api/type=" + slug : "/api").then((res) => {
      setProduct(res.data);
    });
  };
  useEffect(() => {
    //получение продуктов при загрузки страницы
    get();
  }, []);
  document.on("click", () => get(slug));
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
