import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import winston from "winston";
import express from "express";
import http from "http";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { Db } from "mongodb";
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
