const faker = require("faker");

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomStatus() {
  const statuses = ["OPEN", "COMPLETED", "IN_PROGRESS"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

// Bulk load random tasks
function bulkLoadRandomTasks(Task, numTasks) {
  const tasks = [];

  for (let i = 0; i < numTasks; i++) {
    const title = faker.lorem.words(3);
    const description = faker.lorem.sentence();
    const dueDate = faker.date.future();
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()); // random creation date, in order to get data in the metric report
    const status = randomStatus();

    tasks.push({
      title,
      description,
      dueDate,
      createdAt,
      status,
    });
  }
  return Task.bulkCreate(tasks);
}

module.exports = bulkLoadRandomTasks;
