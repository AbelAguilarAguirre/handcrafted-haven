const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0`;
//const uri = process.env.MONGODB_URI;

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await client.close();
  }
}

testConnection();
