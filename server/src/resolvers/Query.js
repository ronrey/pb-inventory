const { ObjectID } = require('mongodb');
const { readFileSync } = require('fs');
const { AuthenticationError } = require('apollo-server-express');
module.exports = {
  getCoffee: (_, { id }, { dataSources }) => dataSources.coffeeAPI.getItem(id),
  getCoffees: (_, __, { dataSources }) => dataSources.coffeeAPI.getItems(),
  totalCoffees: (_, __, { dataSources }) => dataSources.coffeeAPI.totalItems(),
  totalBlends: (_, __, { dataSources }) => dataSources.blendAPI.totalItems(),
  getBlend: (_, { id }, { dataSources }) => dataSources.blendAPI.getItem(id),
  getBlends: (_, __, { dataSources }) => dataSources.blendAPI.getItems(),
  getLearningItems: (_, __, { dataSources }) => dataSources.learningAPI.getItems(),
  getCustomSettings: (_, __, { dataSources }) => dataSources.customeSettingsAPI.getCustomSettings(),
  getBrain: (_, __, { dataSources }) => dataSources.brainAPI.getBrain(),
};
