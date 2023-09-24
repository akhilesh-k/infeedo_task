const taskService = require("../services/taskService");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await taskService.createTask({ title, description, dueDate });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const task = await taskService.updateTask(taskId, {
      title,
      description,
      status,
    });

    if (null == task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (!task) {
      return res.status(400).json({ error: "Status not known" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all tasks (paginate)
exports.getAllTasks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const offset = (page - 1) * size;
    const tasks = await taskService.getAllTasks(size, offset);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get the task metrics
exports.getTaskMetrics = async (req, res) => {
  try {
    const taskMetrics = await taskService.getTaskMetrics();
    res.json(taskMetrics);
  } catch (error) {
    console.error("Error fetching task metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
