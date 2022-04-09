const { MongoClient } = require("mongodb");
// Connection URI
const uri = process.env.MONGO_URL;
// Create a new MongoClient
const client = new MongoClient(uri);

// Connect the client to the server
const mongoClient = async () => {
  await client.connect();
  // Establish and verify connection
  client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to MongoDB");

  return client;
};

module.exports = mongoClient;
