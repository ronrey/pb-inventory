// db.ts
import mongoose from "mongoose";

const mongoDB: string =
  "mongodb+srv://ronrey:ZobieDog@cluster0-qdpve.gcp.mongodb.net/purfectblend?retryWrites=true";
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to database");
});

export default db;
