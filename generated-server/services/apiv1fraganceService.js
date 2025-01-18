const db = require("../db");

module.exports = {
  /**
   * Retrieves all fragrances from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getFragances: (req, res) => {
    db.find({}, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },

  /**
   * Adds a new fragrance to the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  addFragance: (req, res) => {
    const newFragance = req.body;

    // Sample fragrance structure for validation
    const sampleFragance = {
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
    };

    const requiredFields = Object.keys(sampleFragance);
    const missingFields = requiredFields.filter(
      (field) => !newFragance.hasOwnProperty(field),
    );

    if (missingFields.length > 0) {
      res.status(400).send({
        message: "Invalid data. Missing required fields.",
        missingFields,
      });
      return;
    }

    db.insert(newFragance, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res
          .status(201)
          .send({ message: "Fragrance added successfully!", data: result });
      }
    });
  },
};
