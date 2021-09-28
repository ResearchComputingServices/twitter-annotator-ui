import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import { Route, Switch } from "react-router-dom";
import TestHome from "../TestArea/TestHome";
import Admin from '../questionAdmin'
import AdminTweet from '../tweetAdmin'
import RolesRoute from "./RolesRoute";


const Menu = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div id="navbar">
        <ul className="nav navbar-nav">

          <li><Link to="/annotator">Twitter Annotator</Link></li>
          <li><Link to="/admin">Question Admin Panel</Link></li>
          <li><Link to="/tweet">Tweet Admin Panel</Link></li>

        </ul>
        <div style={{ textAlign:"right"}}>
        <button style={{ display:"inline-block", marginRight: "40px" }} onClick={() => UserService.doLogout()}>
          Logout
        </button>
        </div>
        <p style={{ textAlign: "right", marginRight: "20px" }}>
          Welcome {UserService.getUsername()}
        </p>
      </div>

      <Switch>

      <Route exact path="/annotator">
        <TestHome/>
      </Route>

      <RolesRoute path="/admin" roles={['admin']}>
        <Admin/>
      </RolesRoute>

      <RolesRoute path="/tweet" roles={['admin']}>
        <AdminTweet/>
      </RolesRoute>

    </Switch>
    </div>
  </nav>
)

export default Menu
