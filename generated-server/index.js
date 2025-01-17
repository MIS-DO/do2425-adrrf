const http = require("http");
const express = require("express");
const { initialize } = require("@oas-tools/core");

const serverPort = 8080;
const app = express();

app.use(express.json({ limit: "50mb" }));

const config = {
  oasFile: "./api/oas-doc.yaml",
  middleware: {
    security: {
      auth: {},
    },
  },
};

const db = require("./db");

// Initialize database connection
(async () => {
  try {
    console.info("Initializing DB...");

    const _db = await new Promise((resolve, reject) => {
      db.connect((err, dbInstance) => {
        if (err) return reject(err);
        resolve(dbInstance);
      });
    });

    const contacts = await new Promise((resolve, reject) => {
      db.find({}, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (contacts.length === 0) {
      console.info("Empty DB, loading initial data...");
      db.init();
    } else {
      console.info(`DB already has ${contacts.length} contacts.`);
    }
  } catch (error) {
    console.error("Error during DB initialization!", error);
  }
})();

initialize(app, config).then(() => {
  const server = http.createServer(app);

  server.listen(serverPort, () => {
    console.log(`\nApp running at http://localhost:${serverPort}`);
    console.log(
      "________________________________________________________________",
    );

    if (!config?.middleware?.swagger?.disable) {
      console.log(
        `API docs (Swagger UI) available on http://localhost:${serverPort}/docs`,
      );
      console.log(
        "________________________________________________________________",
      );
    }
  });
});
