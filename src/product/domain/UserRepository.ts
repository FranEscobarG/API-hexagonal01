import { User } from "./User";

export interface UserRepository {
  getAll(): Promise<User[] | null>;
  
  // getById(userId: number): Promise<User | null>;

  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null>;
}
