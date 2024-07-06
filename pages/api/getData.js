import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0`;
  //const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to the database.");

    const db = client.db(dbName);
    const collection = db.collection("artist");
    const result = await collection.find({}).toArray();

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data" });
  } finally {
    await client.close();
  }
}
