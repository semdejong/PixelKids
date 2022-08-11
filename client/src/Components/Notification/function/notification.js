import { notification as notificationAntd } from "antd";

export default function notification(title, message, type) {
  notificationAntd[type]({
    message: title,
    description: message,
  });
}
