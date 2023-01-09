const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectId } = require('mongodb');

class BruuApi extends MongoDataSource {
  constructor(coll) {
    super(coll);
  }
  async getItems() {
    return await this.collection.find().toArray();
  }
  async totalItems() {
    return await this.collection.estimatedDocumentCount();
  }
  async getItem(id) {
    return await this.findOneById(id);
  }
  async removeItem(id) {

    debugger
    try {
      const query = { _id: ObjectId(id) };
      const res = await this.collection.deleteOne(query);
      console.log(`removeItem id:${id}, count:${res.deletedCount}`);
      if (res.deletedCount < 1) {
        return {
          success: false,
          code: '404',
          message: `error: item with id= ${id} not found`
        }
      }
      return {
        success: true,
        code: '420',
        message: `ok`
      }
    } catch (error) {
      return {
        success: false,
        code: '404',
        message: `error: ${error}`
      }
    }
  }
  async addItem(item) {
    item.createdAt = new Date();
    item.updatedAt = item.createdAt;
    return await this.collection.insertOne(item).then((result) => {
      const { insertedId } = result;
      console.log('addItem', item);
      return {
        success: true,
        code: '420',
        message: `_id: ${insertedId}, createdAt: ${item.createdAt}`
      }
    }).catch((error) => {
      return {
        success: false,
        code: '404',
        message: `error: ${error}`
      }
    });
  }
  async updateItem(item) {
    const _this = this
    const { _id } = item;
    delete item._id;
    item.updatedAt = new Date();
    const query = { _id: ObjectId(id) };
    const newvalues = { $set: item };
    return await this.collection.updateOne(query, newvalues).then((result) => {
      debugger
      console.log('updateItem', item);
      return {
        success: true,
        code: '420',
        message: `updatedAt: ${item.updatedAt}`
      }
    }).catch((error) => {
      return {
        success: false,
        code: '404',
        message: `error: ${error}`
      }
    });

  }
}

module.exports = BruuApi;
