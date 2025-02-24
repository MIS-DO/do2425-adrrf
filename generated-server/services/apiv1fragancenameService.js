const db = require("../db");
const logger = require("../logger");

module.exports = {
  findByname: async (req, res) => {
    try {
      const { name } = req.params;


      if (!name) {
        logger.warn("New GET request to /fragances/:name without name, sending 400...");
        return res.status(400).send({ message: "Name parameter is required." });
      }
      logger.info("New GET request to /fragances/" + name);
      const result = await db.find({ name });

      if (result.length === 0) {
        logger.warn("There are no fragances with name " + name);
        return res
          .status(404)
          .send({ message: "No fragrance found with the given name." });
      }

      console.debug("Sending fragance: " + JSON.stringify(result, 2, null));
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      logger.error('Error getting data from DB');
      res.status(500).send({ message: "Error finding fragrance", error: err });
    }
  },

  updateFragance: async (req, res) => {
    try {
      const updatedFragance = req.body;
      const { name } = req.params;

      if (!updatedFragance) {
        logger.warn("New PUT request to /fragances/:name without body, sending 400...");
        return res.status(400).send({ message: "Request body is missing." });
      }

      logger.info("New PUT request to /fragances/" + name);

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
        (field) => !(field in updatedFragance)
      );

      if (missingFields.length > 0) {
        logger.warn(
          "New PUT request to /fragances/:name without all required fields, sending 422..."
        );
        return res
          .status(422)
          .send({ message: `Missing fields: ${missingFields.join(", ")}` });
      }

      const existing = await db.find({ name });

      if (existing.length === 0) {
        logger.warn("Fragrance not found");
        return res.status(404).send({ message: "Fragrance not found." });
      }

      logger.debug("Updating fragrance with name " + name);

      await db.updateOne({ name }, updatedFragance);
      res.status(204).send();
    } catch (err) {
      logger.error("Error updating fragrance");
      res.status(500).send({ message: "Error updating fragrance", error: err });
    }
  },

  deleteFragance: async (req, res) => {
    try {
      const { name } = req.params;

      if (!name) {
        logger.warn("New DELETE request to /fragances/:name without name, sending 400...");
        return res.status(400).send({ message: "Name parameter is required." });
      }
      logger.info("New DELETE request to /fragances/" + name);
      const result = await db.deleteOne({ name });

      if (result.deletedCount === 0) {
        logger.warn("Fragrance not found");
        return res.status(404).send({ message: "Fragrance not found." });
      }

      logger.debug("Deleting fragrance with name " + name);
      res.status(204).send();
    } catch (err) {
      logger.error("Error deleting fragrance");
      res.status(500).send({ message: "Error deleting fragrance", error: err });
    }
  },
};
