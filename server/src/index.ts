import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import winston from "winston";
import express from "express";
import http from "http";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    // new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    //  new winston.transports.File({ filename: "index.log" }),
  ],
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export interface ContextValue {
  id?: string;
}
const context = async () => {
  // const context = async ({ req, res }) => {
  //   console.log(req,res)
  // Get the user token from the headers.

  return { id: "TEST" };
};

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4101;
  await new Promise((resolve) => {
    console.log("listen");
    httpServer.listen({ port: PORT }, () => {
      logger.info(
        `🏴‍☠️ Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startApolloServer();

/* import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { MongoClient } from "mongodb";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import { Db } from "mongodb";
import path from "path";
import cookieParser from "cookie-parser";

const RESOURCE_DIR = "client";

// @ts-ignore
global.__basedir = __dirname;
let db: Db;
const context = async () => {
  return { id: "TEST" };
};

async function startApolloServer() {
  console.log("start graphql");
  const app = express();
  const httpServer = http.createServer(app);
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ronrey:ZobieDog@cluster0-qdpve.gcp.mongodb.net/test?retryWrites=true",
      {}
    );
    db = client.db("purfectblend");
    console.log("mongo connected");
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
  });
  await server.start();
  app.use(express.static(path.join(__dirname, RESOURCE_DIR)));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  app.use(cookieParser());

  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  // If the request is not processed by now, it must be a request that we don't handle.
  // We redirect it to the home page.
  app.use((req, res) => {
    console.log("redirect");
    res.redirect("/");
  });

  const PORT = process.env.PORT || 4101;
  await new Promise((resolve) => {
    console.log("listen");
    httpServer.listen({ port: PORT }, () => {
      console.log(
        `🙀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}
startApolloServer();
 */
