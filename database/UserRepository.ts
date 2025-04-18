import db from "./SQLiteDataBase";
import Database from "./SQLiteDataBase";

export type User = {
  id?: number;
  nome: string;
  email: string;
  password: string;
};

export default class UserRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);"
    );
  }

  public async down() {
    const result = await db.runAsync("DROP TABLE IF EXISTS user;");
  }

  public async create(user: User) {
    const result = await db.runAsync(
      "INSERT INTO user (nome, email, password) VALUES (?, ?, ?)",
      [user.nome, user.email, user.password]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<User>("SELECT * FROM user;");
  }
}
