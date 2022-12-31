//! funktioniert derzeit nicht - 213. Video
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("myDatabase.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS myDatabase (
                      id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL,
                      description TEXT NOT NULL
                  )`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
};

export const insertData = (data: { title: string; description: string }) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO myDatabase (title, description) VALUES (?, ?)`,
        [data.title, data.description],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM myDatabase`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};
