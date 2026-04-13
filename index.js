const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");
const routes = require("./routes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "API para gestión de tareas",
    },
  },
  apis: ["./routes/tasks.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", routes);

dbConnection();

app.listen(PORT, () =>
  console.log(`Server started in http://localhost:${PORT}`),
);
