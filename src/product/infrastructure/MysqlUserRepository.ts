import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM users";
    try {
      const [data]: any = await query(sql, []);
      const dataProducts = Object.values(JSON.parse(JSON.stringify(data)));

      return dataProducts.map(
        (product: any) =>
          new User(
            product.id,
            product.name,
            product.email,
            product.password
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new User(
        result[0].id,
        result[0].name,
        result[0].description,
        result[0].price
      );
    } catch (error) {
      return null;
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    const sql =
      "INSERT INTO users (name, description, price) VALUES (?, ?, ?)";
    const params: any[] = [name, email, password];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new User(result.insertId, name, email, password);
    } catch (error) {
      return null;
    }
  }
}
