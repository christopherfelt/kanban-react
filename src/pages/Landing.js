import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && <button className="btn btn-primary">Boards</button>}
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
