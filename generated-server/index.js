const http = require("http");
const express = require("express");
const { initialize } = require("@oas-tools/core");

const serverPort = process.env.PORT || 8080;
const app = express();

app.use(express.json({ limit: "50mb" }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const config = {
  oasFile: "./api/oas-doc.yaml",
  middleware: {
    security: {
      auth: {},
    },
  },
};

const db = require("./db");
const logger = require("./logger");

// Initialize database connection
async function initializeApp() {
  try {
    logger.info("Initializing DB...");
    await db.init();

    await initialize(app, config);

    const server = http.createServer(app);
    server.listen(serverPort, () => {
      logger.info(`\nApp running at http://localhost:${serverPort}`);
      logger.info(
        "________________________________________________________________"
      );

      if (!config?.middleware?.swagger?.disable) {
        logger.info(
          `API docs (Swagger UI) available on http://localhost:${serverPort}/docs`
        );
        logger.info(
          "________________________________________________________________"
        );
      }
    });
  } catch (error) {
    logger.error("Error during initialization:", error);
    process.exit(1);
  }
}

initializeApp();

// Handle cleanup on application shutdown
process.on('SIGINT', async () => {
  try {
    await db.close();
    logger.info('Database connection closed.');
    process.exit(0);
  } catch (error) {
    logger.error('Error during cleanup:', error);
    process.exit(1);
  }
});
