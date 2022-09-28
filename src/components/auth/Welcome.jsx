import UserService from "../services/UserService";

const Welcome = () => (
  <div className="jumbotron">
    <h1>Welcome to Twitter Annotator</h1>
    <p className="lead">Please login to continue</p>
    <p>
      <button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>Login</button>
    </p>
  </div>
)

export default Welcome
