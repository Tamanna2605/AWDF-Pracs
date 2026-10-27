const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

const Task = mongoose.model("Task");

describe("Task Management API", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET / returns status 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
        "Wrong message"
      );
  });

  test("GET /tasks returns status 200", async () => {
    jest.spyOn(Task, "find").mockReturnValue({
      sort: jest.fn().mockResolvedValue([]),
    });

    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(response.body.tasks).toEqual([]);
  });
});