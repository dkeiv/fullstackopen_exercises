import { useNotificationValue } from '../context/slices/notiSlice';

const Notification = () => {
  const noti = useNotificationValue();

  if (!noti) {
    return null;
  } else {
    const { content, error } = noti;
    return <h1 className={error ? 'error' : null}>{content}</h1>;
  }
};

export default Notification;
