import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import "./scss/landing.scss";

const Landing = () => {
  const { logout, loginWithRedirect, user, isAuthenticated } = useAuth0();
  const history = useHistory();

  return (
    <div>
      {isAuthenticated && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand kanban-brand" to="/">
            <h4 className="kanban-brand">Kanban</h4>
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
      )}
      {isAuthenticated && (
        <button
          className="btn btn-primary"
          onClick={() => history.push("/boards")}
        >
          Boards
        </button>
      )}
      {!isAuthenticated && (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
          <button
            className="btn btn-primary"
            onClick={() => loginWithRedirect()}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
