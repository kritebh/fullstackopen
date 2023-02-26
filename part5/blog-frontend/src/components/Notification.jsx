import React from "react";
import PropTypes from "prop-types";
function Notification({ notification: { type, message } }) {
  return <div className={`notify ${type}`}>{message}</div>;
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
