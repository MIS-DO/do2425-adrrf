const db = require("../db");

module.exports = {
  /**
   * Finds a fragrance by name.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  findByname: (req, res) => {
    const { name } = req.params;

    if (!name) {
      return res.status(400).send({ message: "Name parameter is required." });
    }

    db.find({ name: new RegExp(`^${name}$`, "i") }, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.length === 0) {
        return res
          .status(404)
          .send({ message: "No fragrance found with the given name." });
      }

      return res.status(200).send(result);
    });
  },

  /**
   * Updates a fragrance by name.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  updateFragance: (req, res) => {
    const updatedFragance = req.body;
    console.log(updatedFragance);
    const { name } = req.params;

    if (!updatedFragance) {
      return res.status(400).send({ message: "Request body is missing." });
    }

    // Validate that all necessary fields are present in the update request
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
      (field) => !(field in updatedFragance),
    );

    if (missingFields.length > 0) {
      return res
        .status(422)
        .send({ message: `Missing fields: ${missingFields.join(", ")}` });
    }

    db.find({ name }, (err, fragrances) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (fragrances.length === 0) {
        return res.status(404).send({ message: "Fragrance not found." });
      }

      db.update({ name }, updatedFragance, (err) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.status(204).send();
      });
    });
  },

  /**
   * Deletes a fragrance by name.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  deleteFragance: (req, res) => {
    const { name } = req.params;

    if (!name) {
      return res.status(400).send({ message: "Name parameter is required." });
    }

    db.remove({ name }, (err, numRemoved) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (numRemoved === 0) {
        return res.status(404).send({ message: "Fragrance not found." });
      }

      return res.status(204).send();
    });
  },
};
