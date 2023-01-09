const { AuthenticationError } = require('apollo-server-express');
module.exports = {
  addLearningItem: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.learningAPI.addItem(args.item);
  },
  addCoffee: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.coffeeAPI.addItem(args.item);
  },
  addBlend: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.blendAPI.addItem(args.item);
  },
  updateLearningItem: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.learningAPI.updateItem(args.item);
  },
  updateCoffee: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.coffeeAPI.updateItem(args.item);
  },
  updateBlend: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.blendAPI.updateItem(args.item);
  },
  removeLearningItem: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.learningAPI.removeItem(args.id);
  },
  removeCoffee: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.coffeeAPI.removeItem(args.id);
  },
  removeBlend: (_, args, { dataSources, id }) => {
    // if (!id) throw new AuthenticationError('not signed in');
    return dataSources.blendAPI.removeItem(args.id);
  },
};
