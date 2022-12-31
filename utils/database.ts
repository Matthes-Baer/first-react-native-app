//! funktioniert derzeit nicht - 213. Video
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("myDatabase.db");

export const init = () => {
  //   const promise = new Promise((resolve, reject) => {
  //     database.transaction((tx) => {
  //       tx.executeSql(
  //         `CREATE TABLE IF NOT EXISTS myDatabase (
  //                     id INTEGER PRIMARY KEY NOT NULL,
  //                     title TEXT NOT NULL,
  //                     description TEXT NOT NULL
  //                 )`,
  //         [],
  //         () => {
  //           resolve();
  //         },
  //         (_, error) => {
  //           reject(error);
  //         }
  //       );
  //     });
  //   });
  //   return promise;
};
