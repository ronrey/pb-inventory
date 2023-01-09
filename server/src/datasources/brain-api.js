const { MongoDataSource } = require('apollo-datasource-mongodb');
const _id = '61803e3911525478791e8e23';

class BrainApi extends MongoDataSource {
  constructor(coll) {
    super(coll);
  }

  async getBrain(args) {
    debugger;
    try {
      const decaf = await this.collection.findOne({ type: 'decaf' });
      const regular = await this.collection.findOne({ type: 'regular' });
      console.log('getBrain', 'decaf');
      console.log('getBrain', 'regular');
      return { decaf: decaf.net, regular: regular.net };
    } catch (err) {
      debugger;
      console.log(err.stack);
    }
  }
}
module.exports = BrainApi;
