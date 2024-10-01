const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return <h1 className={error ? 'error' : null}>{message}</h1>;
};

export default Notification;
