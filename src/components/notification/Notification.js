import { notification } from "antd";

const Notification = (type, message) => {
  notification[type]({
    message: `${message}`,
    placement: "bottomLeft",
  });
};

export default Notification;
