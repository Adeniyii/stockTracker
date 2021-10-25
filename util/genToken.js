module.exports = (length, alfanumeric) => {
  let characters;
  if (alfanumeric) {
    characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  } else {
    characters = '0123456789';
  }

  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
