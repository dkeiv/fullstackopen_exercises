const Notification = ({ notification, type }) => {
  if (notification === null) {
    return null;
  }

  const style = `notification ${type}`;
  return <div className={style}>{notification}</div>;
};

export default Notification;
