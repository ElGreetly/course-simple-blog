const { Client } = require("pg");

// Connect the client to the server
const dbClient = async () => {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  });
  await client.connect();
  return client;
};
dbClient();
module.exports = dbClient;
