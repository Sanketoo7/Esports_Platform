import React, { useState } from "react";
import Login from "./pages/Login";
import CreateTournament from "./pages/CreateTournament";

function App() {
  const [token, setToken] = useState("");

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <CreateTournament token={token} />
      )}
    </div>
  );
}

export default App;