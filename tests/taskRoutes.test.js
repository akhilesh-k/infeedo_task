const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Task API", () => {
  it("should create a new task", (done) => {
    chai
      .request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "This is a test task",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should update a task", (done) => {
    chai
      .request(app)
      .put("/api/tasks/1")
      .send({
        title: "Updated Task",
        description: "This is an updated test task",
        status: "completed",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should get all tasks", (done) => {
    chai
      .request(app)
      .get("/api/tasks")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
