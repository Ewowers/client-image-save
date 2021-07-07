import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/Header"; //хедер
import Admin from "./Component/Admin.jsx"; //создание товара
import Product from "./Component/Product"; //страница категорий продукта
const App = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Switch>
              <Route path="/admin/">
                <Admin></Admin>
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
