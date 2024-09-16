import React from "react";
import { Toast } from "react-bootstrap";

const CustomToast = ({
  title,
  message,
  handleClose,
  show,
  color,
}) => {
  return (
    <Toast className="toats-period" onClose={() => handleClose()} show={show}>
      <Toast.Header className={color}>
        <strong className="toast-title">{title}</strong>
      </Toast.Header>
      <Toast.Body className="toast-body">{message}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
