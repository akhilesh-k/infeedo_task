const Task = require("../models/Task");
const moment = require("moment-timezone");
const { Op } = require("sequelize");

/**
 * Creates a new task
 * @param {string} title - Title of the task.
 * @param {string} description - Description of the task.
 * @param {string} dueDate - Due date for the task.
 * @returns {string} JWT token.
 */
exports.createTask = async ({ title, description, dueDate }) => {
  // Parses the dueDate string into a JavaScript Date object
  const parsedDueDate = dueDate ? new Date(dueDate) : null;
  return await Task.create({
    title,
    description,
    dueDate: parsedDueDate,
  });
};

/**
 * Update a task.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {Object} taskData - The updated task data.
 * @param {string} taskData.title - The new title for the task.
 * @param {string} taskData.description - The new description for the task.
 * @param {string} taskData.status - The new status for the task.
 * @returns {Promise} - A promise that resolves when the task is successfully updated.
 */
exports.updateTask = async (taskId, { title, description, status }) => {
  const task = await Task.findByPk(taskId);

  if (!task) {
    return null;
  }
  const statuses = ["OPEN", "COMPLETED", "IN_PROGRESS"];
  if (!statuses.includes(description)) {
    return false;
  }
  task.title = title;
  task.description = description;
  task.status = status;
  await task.save();

  return task;
};

/**
 * Get all tasks with pagination.
 *
 * @param {number} size - The number of tasks to retrieve per page.
 * @param {number} offset - The offset from where to start retrieving tasks.
 * @returns {Promise} - A promise that resolves with the paginated list of tasks.
 */
exports.getAllTasks = async (size, offset) => {
  return await Task.findAndCountAll({ size, offset });
};

/**
 * Get task metrics including overall and monthly metrics, as well as tasks due today.
 *
 * @returns {Promise} - A promise that resolves with an object containing task metrics.
 */ exports.getTaskMetrics = async () => {
  try {
    // Calculates overall task metrics based on status
    const overallMetrics = await Task.findAll({
      attributes: [
        [
          Task.sequelize.fn(
            "SUM",
            Task.sequelize.literal(
              'CASE WHEN status = "OPEN" THEN 1 ELSE 0 END'
            )
          ),
          "open_tasks",
        ],
        [
          Task.sequelize.fn(
            "SUM",
            Task.sequelize.literal(
              'CASE WHEN status = "IN_PROGRESS" THEN 1 ELSE 0 END'
            )
          ),
          "inprogress_tasks",
        ],
        [
          Task.sequelize.fn(
            "SUM",
            Task.sequelize.literal(
              'CASE WHEN status = "COMPLETED" THEN 1 ELSE 0 END'
            )
          ),
          "completed_tasks",
        ],
      ],
    });

    // Calculates monthly task metrics
    const monthlyMetrics = await Task.findAll({
      attributes: [
        [
          Task.sequelize.fn(
            "strftime",
            "%Y-%m",
            Task.sequelize.col("createdAt")
          ),
          "date",
        ],
        [
          Task.sequelize.fn(
            "SUM",
            Task.sequelize.literal(
              'CASE WHEN status = "OPEN" THEN 1 ELSE 0 END'
            )
          ),
          "open_tasks",
        ],
        [
          Task.sequelize.fn(
            "SUM",
            Task.sequelize.literal(
              'CASE WHEN status = "IN_PROGRESS" THEN 1 ELSE 0 END'
            )
          ),
          "inprogress_tasks",
        ],
        [
          Task.sequelize.fn(
            "SUM",
            Task.sequelize.literal(
              'CASE WHEN status = "COMPLETED" THEN 1 ELSE 0 END'
            )
          ),
          "completed_tasks",
        ],
      ],
      group: ["date"],
      order: [["date", "ASC"]],
    });

    const todayStart = moment().startOf("day"); // Get the start of the current day
    const todayEnd = moment().endOf("day"); // Get the end of the current day

    const dueTodayTasks = await Task.findAll({
      where: {
        dueDate: {
          [Op.between]: [todayStart, todayEnd], // Check if the dueDate is within the current day
        },
      },
    });

    const response = {
      overallMetrics: {
        open_tasks: overallMetrics[0].get("open_tasks"),
        inprogress_tasks: overallMetrics[0].get("inprogress_tasks"),
        completed_tasks: overallMetrics[0].get("completed_tasks"),
      },
      monthlyMetrics: monthlyMetrics.map((metric) => ({
        date: moment(metric.get("date")).format("MMMM YYYY"),
        metrics: {
          open_tasks: metric.get("open_tasks"),
          inprogress_tasks: metric.get("inprogress_tasks"),
          completed_tasks: metric.get("completed_tasks"),
        },
      })),
      due_today: dueTodayTasks.map((task) => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      })),
    };

    return response;
  } catch (error) {
    console.error("Error fetching task metrics:", error);
    return [];
  }
};
