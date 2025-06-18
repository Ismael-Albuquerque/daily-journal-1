import db from "./SQLiteDataBase";
import { Emotions } from "../types/Emotions";

export default class EmotionsRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS emotions(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, data TEXT NOT NULL, emocao TEXT NOT NULL, descricao TEXT, FOREIGN KEY (user_id) REFERENCES user(id));"
    );
  }

  public async down() {
    const result = await db.runAsync("DROP TABLE IF EXISTS emotions;");
  }

  public async create(emotion: Emotions) {
    const result = await db.runAsync(
      "INSERT INTO emotions (user_id, data, emocao, descricao) VALUES (?, ?, ?, ?)",
      [emotion.user_id, emotion.data, emotion.emocao, emotion.descricao]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<Emotions>("SELECT * FROM emotions;");
    return result;
  }

  public async delete(id: number) {
    await db.runAsync("DELETE FROM emotions WHERE id = ?", [id]);
  }

  public async update(emotion: Emotions) {
    await db.runAsync(
      "UPDATE emotions SET data = ?, emocao = ?, descricao = ? WHERE id = ?",
      [emotion.data, emotion.emocao, emotion.descricao, emotion.id]
    );
  }
}
