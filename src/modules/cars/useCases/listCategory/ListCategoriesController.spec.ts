import request from "supertest";
import { app } from "@shared/infra/http/app";
import { v4 as uuid } from "uuid";

import { hash } from "bcrypt";
import { dataSource } from "@shared/infra/typeorm/data-source";

describe("List Category Controller", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        description: "description test",
        name: "name test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("name test");
  });
});
