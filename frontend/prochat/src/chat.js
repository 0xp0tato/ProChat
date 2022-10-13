import React, { useEffect, useState } from "react";
import { user } from "./joinpage";
import io from "socket.io-client";
import "./chat.css";
import Message from "./message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

function Chat() {
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(messages);

  useEffect(() => {
    socket = io.connect("https://prochat-demo.herokuapp.com/");

    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setmessages([...messages, data]);
      console.log(user, ":", data.message);
    });

    socket.on("userjoined", (data) => {
      setmessages([...messages, data]);
      console.log(data.user, ":", data.message);
    });

    socket.on("leave", (data) => {
      setmessages([...messages, data]);
      console.log(data.user, ":", data.message);
    });

    return () => {
      socket.emit("disconnet");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <a href="/">
            <button alt="Close">Close</button>
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          ></input>
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
