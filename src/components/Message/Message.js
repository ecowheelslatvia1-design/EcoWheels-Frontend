import React from "react";
import "./Message.css";

const Message = ({ variant = "info", children, onClose }) => {
  return (
    <div className={`message message-${variant}`}>
      <span>{children}</span>
      {onClose && (
        <button className="message-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Message;
