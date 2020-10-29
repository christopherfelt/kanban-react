import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";

import Boards from "./pages/Boards";
import BoardDetail from "./pages/BoardDetail";
import Landing from "./pages/Landing";

import { BoardProvider } from "./context/BoardState";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <Router>
      <BoardProvider>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              Kanban
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav"></div>
            {isAuthenticated && <h5>User: {user.name}</h5>}
            {!isAuthenticated && (
              <button
                className="btn btn-secondary mx-2"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
            {isAuthenticated && (
              <button
                className="btn btn-danger mx-2"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            )}
          </nav>
        </div>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/boards" exact component={Boards} />
          <Route path="/boarddetail/:boardId" component={BoardDetail} />
        </Switch>
      </BoardProvider>
    </Router>
  );
}

export default App;
