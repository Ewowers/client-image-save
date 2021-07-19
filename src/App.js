import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./Component/admin";
import User from "./Component/user";
import Authorization from "./Component/Authorization";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/user/:slug">
          <User />
        </Route>
        <Route path="/" exact>
          <Authorization />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
