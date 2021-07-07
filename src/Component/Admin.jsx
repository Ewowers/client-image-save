import React, { useState, useEffect } from "react";
import axios from "axios";
const Admin = () => {
  let [form, setForm] = useState({ type: "pod" }); // объект с формой
  let [product, setProduct] = useState([]); // массив товаров
  let finish = () => {
    //создание продуктов
    axios.post("/api/add", form).then((res) => {
      gets();
    });
  };
  useEffect(() => gets(), []); // получение продуктов
  let gets = () => {
    //get запрос для получение товаров
    axios.get("/api").then((response) => {
      setProduct(response.data);
    });
  };
  const change = (e) => {
    // функция получение данных с форм
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const deletes = (id) => {
    // функция удаление товара
    console.log(id);
    console.log("/api/" + id);
    axios.delete("/api/" + id, { id: { id } }).then((res) => {
      gets();
    });
  };
  const showFile = async (e) => {
    // чтение файла
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      console.log(ev.target.result);
      setForm({ ...form, upload: ev.target.result });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="card" style={{ border: "none" }}>
            <div className="form-group">
              <div className="mb-3">
                <label htmlFor="">Название</label>
                <input type="text" name="title" onChange={change} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="">Цена</label>
                <input type="text" name="prise" onChange={change} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="">Тип</label>
                <select name="type" className="form-select" onChange={change}>
                  <option value="pod">Под системы</option>
                  <option value="elektronnye-sigarety">Устройства</option>
                  <option value="alkaline">Щелочные жидкости</option>
                  <option value="salt">Солевые жидкости</option>
                  <option value="atomajzery">Атомайзеры</option>
                  <option value="component">Комплектующие</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="">Картинка</label>
                <input type="file" className="form-file" name="upload" onChange={showFile} />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={finish}>
                  Создать
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={form.upload} className="w-100 card-img-top" />
            <div className="card-body">
              <div className="card-title">{form.title || "title"}</div>
            </div>
          </div>
        </div>
        <div className="col-9" style={{ display: "flex", flexWrap: "wrap", alignItems: "start" }}>
          {product.map((item, i) => {
            return (
              <div key={i} className="card" style={{ position: "relative" }}>
                <button
                  onClick={() => deletes(item._id)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                  className="btn btn-danger"
                >
                  x
                </button>
                <img src={item.upload} className="w-100 card-img-top" />
                <div className="card-body">
                  <div className="card-title">{item.title}</div>
                  <div className="card-body">
                    <p>Цена {item.prise}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Admin;
