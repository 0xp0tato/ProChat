// import React from "react";
// import "./message.css";

// export default function Message({ user, message, classs }) {
//   if (user) {
//     return <div className={`messageBox ${classs}`}>{`${user}:${message}`}</div>;
//   } else {
//     return <div className="messageBox left">{`You:${message}`}</div>;
//   }
// }

import React from "react";
import "./message.css";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`messageBox ${classs}`}>{`${user}: ${message}`}</div>
    );
  } else {
    return <div className={`messageBox ${classs}`}>{`You: ${message}`}</div>;
  }
};

export default Message;
