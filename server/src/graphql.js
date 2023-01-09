const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { MongoClient } = require('mongodb');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const GenericAPI = require('./datasources/generic-api');
const BrainAPI = require('./datasources/brain-api');
let db;
const context = async ({ req, res }) => {
  // Get the user token from the headers.

  return { id: 'TEST' };
};
async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://ronrey:ZobieDog@cluster0-qdpve.gcp.mongodb.net/test?retryWrites=true',
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    db = client.db('purfectblend');
  } catch (error) {
    console.log(`			
		      Mongo DB Host not found!
		      please add DB_HOST environment variable to .env file
		
		      exiting...			   
		    `);
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => {
      return {
        coffeeAPI: new GenericAPI(db.collection('coffees')),
        ordersAPI: new GenericAPI(db.collection('orders')),
        blendAPI: new GenericAPI(db.collection('ourblends')),
        learningAPI: new GenericAPI(db.collection('learning')),
        brainAPI: new BrainAPI(db.collection('brain')),
        customeSettingsAPI: new GenericAPI(
          db.collection('customBlendSettings')
        ),
      };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  const PORT = 4101;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🙀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer();
