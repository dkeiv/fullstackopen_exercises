const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const { content, isError } = message;
  return <h1 className={isError ? 'error' : null}>{content}</h1>;
};

export default Notification;
