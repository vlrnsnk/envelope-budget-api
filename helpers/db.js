module.exports = {
  createId(data) {
    const lastItem = data[data.length - 1];
    const newId = lastItem.id + 1;

    if (newId === NaN || newId < 0 || newId === undefined) {
      return 1;
    }

    return newId;
  },

  findById(data, id) {
    const item = data.find(item => item.id === parseInt(id));

    if (!item) {
      console.log('Item not found');
    }

    return item;
  },

  deleteById(data, id) {
    const index = data.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      console.log('Invalid index');
    }

    data.splice(index, 1);

    return data;
  },
};
