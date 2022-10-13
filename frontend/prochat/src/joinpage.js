import "./joinpage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
//import io from "socket.io-client";

//const socket = io.connect("http://localhost:5000");

let user;

const submitUser = () => {
  user = document.getElementById("username").value;
  document.getElementById("username").value = "";
};

export default function Joinpage() {
  const [name, setname] = useState("");

  return (
    <div className="Joinpage">
      <div className="JoinPageBox">
        <h1 className="AppName">PROCHAT</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          id="username"
          placeholder="Enter Your Name"
        ></input>
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={submitUser} className="joinBtn">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export { user };
