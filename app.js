const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
const { Sequelize } = require("sequelize");

/*
 * Uncomment to load the data
 */
// const Task = require("./src/models/Task"); // Import your Task model
// const bulkLoadRandomTasks = require("./src/utils/loadTasks");
// const numTasksToCreate = 1000; // Specify the number of random tasks to create

const app = express();
const sequelize = require("./src/database/db"); // Adjust the path as needed

const taskRoutes = require("./src/routes/taskRoutes");

app.use(express.json());

app.use("/api", taskRoutes);

// synchronises the db
sequelize.sync({ force: false }).then(() => {
  console.log("Database is synchronized");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Catch all route for any other request
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
 * Uncomment to load the data
 */

// bulkLoadRandomTasks(Task, numTasksToCreate)
//   .then(() => {
//     console.log(`${numTasksToCreate} random tasks created successfully.`);
//   })
//   .catch((error) => {
//     console.error("Error creating random tasks:", error);
//   });
