const db = require("../db");
const logger = require("../logger");
module.exports = {
  getFragances: async (req, res) => {
    try {
      logger.info("New GET request to /fragances");
      const result = await db.find({});
      logger.debug("Sending fragances: " + JSON.stringify(result, 2, null));
      res.status(200).send(result);
    } catch (err) {
      logger.error("Error getting data from DB");
      res.status(500).send({ message: "Error retrieving fragrances", error: err });
    }
  },

  addFragance: async (req, res) => {
    try {
      const newFragance = req.body;
      const requiredFields = [
        "name",
        "brand",
        "type",
        "notes",
        "gender",
        "release_year",
        "owned",
      ];

      const missingFields = requiredFields.filter(
        (field) => !newFragance.hasOwnProperty(field)
      );

      if (missingFields.length > 0) {
        logger.warn(
          "New POST request to /fragances without all required fields, sending 400..."
        );
        return res.status(400).send({
          message: "Invalid data. Missing required fields.",
          missingFields,
        });
      }
      logger.info("New POST request to /fragances");

      const result = await db.insertOne(newFragance);
      logger.debug("Fragrance added: " + JSON.stringify(newFragance, 2, null));
      res.status(201).send({
        message: "Fragrance added successfully!",
        data: { ...newFragance, _id: result.insertedId },
      });
    } catch (err) {
      logger.error("Error getting data from DB");
      res.status(500).send({ message: "Error adding fragrance", error: err });
    }
  },
};
