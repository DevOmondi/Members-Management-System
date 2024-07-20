const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const syncDb = () => {
  db.serialize(() => {
    // Users table
    db.run(
      `CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT
              )`,
      (err) => {
        if (err) {
          console.log("Couldn't create users table:", err.message);
        } else {
          console.log("Created users table successfully");
        }
      }
    );

    // Members table
    db.run(
      `CREATE TABLE members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        middleName TEXT,
        lastName TEXT,
        idNumber TEXT,
        dateOfBirth TEXT,
        photo BLOB
      )`,
      (err) => {
        if (err) {
          console.log("Couldn't create members table:", err.message);
        } else {
          console.log("Created members table successfully");
        }
      }
    );
  });
};

syncDb();

module.exports = db;
