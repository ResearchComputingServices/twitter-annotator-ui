import "./App.css";
import "antd/dist/antd.css";
import TestHome from "./components/TestArea/TestHome";
import Admin from './components/questionAdmin'
import Menu from "./components/auth/Menu"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RenderOnAnonymous from "./components/auth/RenderOnAnonymous";
import RenderOnAuthenticated from "./components/auth/RenderOnAuthenticated";
import StoreService from "./components/services/StoreService";
import Welcome from "./components/auth/Welcome";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const store = StoreService.setup();

function App() {
  return (

<div className="App">
    <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <RenderOnAnonymous>
          <Welcome />
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <Menu />
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  </Provider>
  </div>
  );
}

export default App;
