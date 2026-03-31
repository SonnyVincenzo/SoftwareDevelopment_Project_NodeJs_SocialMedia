import { useState } from "react";

function App() {
  //stores user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //stores message (err/succ)
  const [message, setMessage] = useState("");

  //check if reg/log
  const [mode, setMode] = useState("register");

  //handles both register and login depending on mode
  const handleSubmit = async () => {
    //endppoint
    const endpoint = mode === "register" ? "register" : "login";

    const res = await fetch(`http://localhost:5000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    //if request was succ
    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      {/*title change*/}
      <h1>{mode === "register" ? "Register" : "Login"}</h1>

      {/*user*/}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      {/*pass*/}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {/*register or login*/}
      <button onClick={handleSubmit}>
        {mode === "register" ? "Register" : "Login"}
      </button>

      <br /><br />

      {/*switch between reg/log*/}
      <button onClick={() => setMode(mode === "register" ? "login" : "register")}>
        Switch to {mode === "register" ? "Login" : "Register"}
      </button>

      <br /><br />

      {/*succ/err on GUI*/}
      {message && (
        <p style={{ color: message.toLowerCase().includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default App;