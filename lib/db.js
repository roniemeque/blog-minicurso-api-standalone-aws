import { MongoClient } from "mongodb";

// Create cached connection variable
let cachedDb = null;
// for debug only
let dbComCache = false;

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
export const connectToDatabase = async () => {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    console.log("reusing cachedDb from hot container");
    dbComCache = true;
    return cachedDb;
  }

  console.log("no cachedDb available");
  console.log(process.env.MONGODB_URI, process.env.MONGODB_DBNAME);

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = client.db(process.env.MONGODB_DBNAME);

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
};

export const getCollection = async collectionName => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase();

  // Select the "users" collection from the database
  const collection = db.collection(collectionName);
  return { collection, dbComCache };
};
