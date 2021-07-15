import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./Component/admin";
import Product from "./Component/Product"; //страница категорий продукта
import Authorization from "./Component/Authorization";
const App = () => {
  return (
    <Router>
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
