import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { v4 as uuiV4 } from "uuid";
import { User } from "./User";

@Entity("users_tokens")
class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn([{ name: "user_id" }])
  user_id: string;

  @Column()
  expires_dates: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuiV4();
    }
  }
}

export { UserToken };
