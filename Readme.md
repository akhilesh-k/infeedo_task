# Task Management and tracking System (Infeedo task)

This project is a Task Management System built using Node.js and a SQL database. It provides a set of CRUD APIs for managing tasks, as well as an API to get task metrics.

## Project structure

- infeedo_task/
  - src/
    - controllers/
      - taskController.js
    - models/
      - Task.js
    - routes/
      - taskRoutes.js
    - services/
      - taskService.js
    - database/
      - db.js
  - tests/
    - taskRoutes.test.js
  - node_modules/
  - package.json
  - app.js
  - README.md
  - .gitignore

## Features

1. API to create a new task.
2. API to update an existing task.
3. API to get a paginated list of all tasks.
4. API to get task metrics including open tasks, in-progress tasks, and completed tasks.
5. Swagger documentation for easy API reference.
6. Bulk load random tasks for testing purposes. (See utils/loadTasks.js)
7. Dockerise the source code to run as a docker image.

## Requirements

Docker running in the workstation OR having Node + Sqlite installed in the machine.

## Usage

### Running with Docker
  
Build the docker image. Run the below command in the project directory:

`docker build -t infeedo_task .`

Run the docker image:

`docker run -p 3000:3000 infeedo_task`

### Running without Docker

Install the dependencies:

`yarn install`

Start the development server:

`yarn start`

Verify the server has started, you should see the below message on the terminal.

Server is running on port 3000

Youn can access the APIs on <http://localhost:3000/>

## API Documentation

Swagger UI is available at <http://localhost:3000/api-docs/>
