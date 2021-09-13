import "./App.css";
import "antd/dist/antd.css";
import TestHome from "./components/TestArea/TestHome";
import Admin from './components/questionAdmin'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route path="/" exact>            <TestHome />          </Route>
          <Route path="/admin" exact>            <Admin />          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
