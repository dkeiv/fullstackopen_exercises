import { useNotificationValue } from '../context/slices/notiSlice';

const SucessAlert = ({ children }) => {
  return (
    <div
      className="absolute bottom-0 right-0 mb-4 mr-4 flex min-w-20 items-center justify-center rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span>{children}</span>
    </div>
  );
};

const DangerAlert = ({ children }) => {
  return (
    <div
      className="absolute bottom-0 right-0 mb-4 mr-4 flex min-w-20 items-center justify-center rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span>{children}</span>
    </div>
  );
};

const Notification = () => {
  const noti = useNotificationValue();

  if (!noti) {
    return null;
  }

  const { content, error } = noti;

  if (error) {
    return <DangerAlert>{content}</DangerAlert>;
  } else {
    return <SucessAlert>{content}</SucessAlert>;
  }
};

export default Notification;
