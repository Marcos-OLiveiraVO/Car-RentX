import request from "supertest";
import { app } from "@shared/infra/http/app";
import { v4 as uuid } from "uuid";

import { hash } from "bcrypt";
import { dataSource } from "@shared/infra/typeorm/data-source";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await dataSource.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driver_licence")
      values('${id}', 'admin', 'admin@mail.com', '${password}', true, 'now()', 'XXX-XXX')`
    );
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        description: "description test",
        name: "description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a category with with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        description: "description test",
        name: "description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
