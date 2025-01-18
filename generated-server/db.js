"use strict";

const Datastore = require("nedb");
const assert = require("assert");
const path = require("path");

const dbPath = "data/";
const dbFileName = path.join(__dirname, dbPath, "fragances.db");

let dbInstance;

/**
 * Connects to the database and initializes the connection if not already established.
 * @param {Function} callback - Callback function to handle the connection.
 */
function connect(callback) {
  if (dbInstance) {
    console.warn("Database connection already exists!");
    return callback(null, dbInstance);
  }

  dbInstance = new Datastore({
    filename: dbFileName,
    autoload: true,
  });
  return callback(null, dbInstance);
}

/**
 * Retrieves the current database connection.
 * @returns {Datastore} The current database instance.
 * @throws Will throw an error if the connection has not been established.
 */
function getConnection() {
  assert.ok(
    dbInstance,
    "Database connection not established. Please call connect() first.",
  );
  return dbInstance;
}

/**
 * Initializes the database with sample data.
 * @returns {Promise} Resolves when the sample data is inserted.
 */
async function init() {
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

  return new Promise((resolve, reject) => {
    getConnection().insert(sampleFragrances, (err, docs) => {
      if (err) return reject(err);
      resolve(docs);
    });
  });
}

/**
 * Executes a query on the database.
 * @param {Object} query - The query object.
 * @param {Function} callback - Callback function to handle the results.
 */
function find(query, callback) {
  getConnection().find(query, callback);
}

/**
 * Inserts a new document into the database.
 * @param {Object} doc - The document to insert.
 * @param {Function} callback - Callback function to handle the result.
 */
function insert(doc, callback) {
  getConnection().insert(doc, callback);
}

/**
 * Updates a document in the database that matches the query.
 * @param {Object} query - The query object.
 * @param {Object} newDoc - The new document values.
 * @param {Function} callback - Callback function to handle the result.
 */
function update(query, newDoc, callback) {
  getConnection().update(query, newDoc, callback);
}

/**
 * Removes a document from the database.
 * @param {Object} query - The query object.
 * @param {Function} callback - Callback function to handle the result.
 */
function remove(query, callback) {
  getConnection().remove(query, callback);
}

module.exports = {
  connect,
  getConnection,
  init,
  find,
  insert,
  update,
  remove,
};
