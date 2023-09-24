const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Define the API version (e.g., v1)
const apiVersion = "/v1";

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with a due date.
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             dueDate:
 *               type: string
 *               format: date    # Define the format of the due date (e.g., YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */
router.post(`${apiVersion}/tasks`, taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     description: Update a task by ID.
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the task to update.
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               type: string
 *               enum: [open, inprogress, completed]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
router.put(`${apiVersion}/tasks/:taskId`, taskController.updateTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks (paginate)
 *     description: Get a paginated list of all tasks.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         type: integer
 *         description: Page number
 *       - name: size
 *         in: query
 *         required: false
 *         type: integer
 *         description: Size
 *     responses:
 *       200:
 *         description: List of tasks
 *       400:
 *         description: Bad request
 */
router.get(`${apiVersion}/tasks`, taskController.getAllTasks);

/**
 * @swagger
 * /api/v1/task-metrics:
 *   get:
 *     summary: Get task metrics
 *     description: Get task metrics based on status and timeline.
 *     responses:
 *       200:
 *         description: Task metrics retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get(`${apiVersion}/task-metrics`, taskController.getTaskMetrics);

module.exports = router;
