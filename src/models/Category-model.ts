import { v4 as uuidV4 } from "uuid";

class Categories {
  id?: string;
  name: string;
  description: string;
  created_At: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Categories };
