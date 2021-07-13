import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./Component/Header"; //хедер
import Admin from "./Component/admin";
import Product from "./Component/Product"; //страница категорий продукта
import Authorization from "./Component/Authorization";
const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/category/:id">
          <Product />
        </Route>
        <Route path="/" exact>
          <Authorization />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
