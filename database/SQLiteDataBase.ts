import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("dailyjournal.db");

export default db;
