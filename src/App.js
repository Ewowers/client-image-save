import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./Component/Header"; //хедер
import Admin from "./Component/adminPanel/Admin.jsx"; //создание товара
import UserPanel from "./Component/adminPanel/Users";
import Product from "./Component/Product"; //страница категорий продукта
const PanelAdmin = () => {
  const styles = {
    li: {
      listStyle: "none",
    },
    a: {
      margin: 5,
      color: "#000",
    },
  };
  return (
    <nav>
      <ul style={{ display: "flex" }}>
        <li style={styles.li}>
          <Link to="/admin/product" style={styles.a}>
            Товары
          </Link>
        </li>
        <li style={styles.li}>
          <Link to="/admin/user" style={styles.a}>
            Юзеры
          </Link>
        </li>
      </ul>
    </nav>
  );
};
const App = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Switch>
              <Route path="/admin/product" exact>
                {/* {создание и удаление товара} */}
                <PanelAdmin />
                <Admin />
              </Route>
              <Route path="/admin/user" exact>
                {/* потвержедение юзера */}
                <PanelAdmin />
                <UserPanel />
              </Route>
              <Route path="/category/:id">
                <Product />
              </Route>
              <Route path="/" exact>
                <Product />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
