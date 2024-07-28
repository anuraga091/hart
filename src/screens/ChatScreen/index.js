export const getMessageLevel = (messageCount, isDoc = true) => {
  if (messageCount <= 80) {
    return isDoc ? 'level1' : 'level1Questions';
  } else if (messageCount > 80 && messageCount <= 250) {
    return isDoc ? 'level2' : 'level2Questions';
  } else {
    return isDoc ? 'level3' : 'level3Questions';
  }
};

export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
};
