import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";

import Landing from "./pages/Landing";

import { BoardProvider } from "./context/BoardState";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <Router>
      <BoardProvider>
        <div className="App">
          <h1>Kanban</h1>
          {isAuthenticated && <h5>User: {user.name}</h5>}
          <Landing />
        </div>
      </BoardProvider>
    </Router>
  );
}

export default App;
