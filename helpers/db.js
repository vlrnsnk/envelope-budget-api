module.exports = {
  createId(data) {
    const lastItem = data[data.length - 1];
    const newId = lastItem.id + 1;

    if (newId === NaN || newId < 0 || newId === undefined) {
      return 1;
    }

    return newId;
  },
};
