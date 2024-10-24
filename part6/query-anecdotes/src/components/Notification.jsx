import { useNotificationValue } from '../hook/NotificationContext';

const Notification = () => {
  const message = useNotificationValue();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (message) {
    return <div style={style}>{message}</div>;
  } else return null;
};

export default Notification;
