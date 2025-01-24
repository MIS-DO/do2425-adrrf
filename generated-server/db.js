const { MongoClient } = require("mongodb");

const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
console.log(uri)
let client;
let db;
let collection;

async function connect() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db(dbName);
      collection = db.collection(collectionName);
      logger.info("Successfully connected to MongoDB.");
    }
    return collection;
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function init() {
  try {
    const collection = await connect();
    const count = await collection.countDocuments();

    if (count === 0) {
      const sampleFragrances = [
        {
              name: "Creeed Aventus",
              brand: "Creeed",
              type: "Eau de Parfum",
              notes: {
                top: ["Pineapple", "Bergamot", "Blackcurrant"],
                middle: ["Birch", "Patchouli", "Rose"],
                base: ["Musk", "Oakmoss", "Vanilla"],
              },
              gender: "Masculine",
              release_year: 2010,
              owned: true,
            },
            {
              name: "Tom Ford Oud Wood",
              brand: "Tom Ford",
              type: "Eau de Parfum",
              notes: {
                top: ["Rosewood", "Cardamom", "Chinese pepper"],
                middle: ["Oud", "Sandalwood", "Vetiver"],
                base: ["Tonka bean", "Vanilla", "Amber"],
              },
              gender: "Masculine",
              release_year: 2007,
              owned: true,
            },
            {
              name: "Layton",
              brand: "Parfums de Marly",
              type: "Eau de Parfum",
              notes: {
                top: ["Apple", "Bergamot", "Lavender"],
                middle: ["Jasmine", "Geranium", "Violet"],
                base: ["Vanilla", "Sandalwood", "Cardamom"],
              },
              gender: "Masculine",
              release_year: 2016,
              owned: false,
            },
            {
              name: "Baccarat Rouge 540",
              brand: "Maison Francis Kurkdjian",
              type: "Eau de Parfum",
              notes: {
                top: ["Saffron", "Jasmine", "Amberwood"],
                middle: ["Ambergris", "Fir resin", "Cedar"],
                base: ["Musk", "Oakmoss", "Vanilla"],
              },
              gender: "Unisex",
              release_year: 2015,
              owned: false,
            },
      ];

      await collection.insertMany(sampleFragrances);
      logger.info("Sample data initialized successfully");
    }
  } catch (error) {
    logger.error("Error initializing database:", error);
    throw error;
  }
}

async function find(query) {
  const collection = await connect();
  return collection.find(query).toArray();
}

async function insertOne(doc) {
  const collection = await connect();
  return collection.insertOne(doc);
}

async function updateOne(query, update) {
  const collection = await connect();
  if (update._id) {
    delete update._id;
  }
  return collection.updateOne(query, { $set: update });
}

async function deleteOne(query) {
  const collection = await connect();
  return collection.deleteOne(query);
}

async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    collection = null;
  }
}

module.exports = {
  connect,
  init,
  find,
  insertOne,
  updateOne,
  deleteOne,
  close
};
