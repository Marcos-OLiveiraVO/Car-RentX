import { dataSource } from "../data-source";
import { v4 as uuidV4 } from "uuid";
import { hashSync } from "bcrypt";

async function create() {
  const id = uuidV4();
  const password = hashSync("admin", 8);

  await dataSource.initialize();

  await dataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driver_licence")
    values('${id}', 'admin', 'admin@mail.com', '${password}', true, 'now()', 'XXX-XXX')`
  );

  await dataSource.destroy();
}

create().then(() => console.log("User admin created !"));
