//? Alternative zu herkömmlichen Backend APIs für Databases wie Firebase, mongoDB etc.
//? Das Ganze beruht auf dem SQL Syntax - es können also die dazugehörigen Befehle genutzt werden.
//? Die Funktionen hier geben jeweils ein Promise zurück.

import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("myDatabase.db");

//? Diese Funktion muss im jeweiligen Screen (oder auch ganz am Anfang) ausgeführt werden, um die Database zu initialisieren, falls sie noch nicht vorhanden ist.
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

//? Diese Funktion sorgt dafür, dass ein Eintrag hinzugefügt werden kann auf Basis des Input-Objekts.
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

//? Diese Funktion liest die jeweiligen Daten aus der database.
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
