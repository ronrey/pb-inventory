const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const http = require("http");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const GenericAPI = require("./datasources/generic-api");
const BrainAPI = require("./datasources/brain-api");
const jwt = require("jsonwebtoken");
const jwtAuthenticator = require("./jwt/authenticateToken");
const path = require("path"),
  cookieParser = require("cookie-parser"),
  RESOURCE_DIR = "client";
let db;
global.__basedir = __dirname;
const context = async ({ req, res }) => {
  debugger;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    const id = await jwtAuthenticator(token);
    return { id };
  }
};
async function start() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ronrey:ZobieDog@cluster0-qdpve.gcp.mongodb.net/test?retryWrites=true",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    db = client.db("purfectblend");
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
    dataSources: () => {
      return {
        coffeeAPI: new GenericAPI(db.collection("coffees")),
        blendAPI: new GenericAPI(db.collection("ourblends")),
        customeSettingsAPI: new GenericAPI(
          db.collection("customBlendSettings")
        ),
        ordersAPI: new GenericAPI(db.collection("orders")),
        learningAPI: new GenericAPI(db.collection("learning")),
        brainAPI: new BrainAPI(db.collection("brain")),
      };
    },
    context: context,
  });
  await server.start();
  const app = express();
  app.use(cors());
  http.createServer(app);
  server.applyMiddleware({ app });
  app.use(express.static(path.join(__dirname, RESOURCE_DIR)));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  app.use(cookieParser());

  app.use(function (req, res, next) {
    //  res.status(404).send("Sorry can't find that!");
    res.redirect("https://www.purfectblend.com");
  });
  const PORT = 5100;
  await new Promise((r) => app.listen({ port: PORT }, r));
  console.log(
    `☕️ Inventory Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}
start();
