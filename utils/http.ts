//! These are helper functions to access the firebase REST API

const BACKEND_URL =
  "https://react-native-project-4a7af-default-rtdb.europe-west1.firebasedatabase.app";

//? Post request to add some data to the "testData" segment.
export const addToDatabase = async (inputBody: { itemName: string }) => {
  try {
    const response = await fetch(BACKEND_URL + "/testData.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputBody),
    });
    const result = await response.json();
    //? "name" is the key for the id that get's created for the respective item created in the firebase database segment.
    console.log(result.name);
  } catch (error) {
    console.log(error);
  }
};

//? Get request to read all data from the "testData" segment.
export const readAllDataFromDatabase = async () => {
  try {
    const response = await fetch(BACKEND_URL + "/testData.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    //? Logic to convert the firebase result (which consists of multiple objects) to an array for the frontend.
    const responseArray = [];
    for (let key in result) {
      const input = {
        id: key,
        name: result[key].name,
      };
      responseArray.push(input);
    }
    return responseArray;
  } catch (error) {
    console.log(error);
  }
};

//? Put request to update a specific document in the firebase database.
export const updateDataFromDatabase = async (id: string) => {
  try {
    const response = await fetch(BACKEND_URL + `/testData/${id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "adjustedName" }),
    });
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};

//? Delete request to delete a specific document in the firebase database.
export const deleteDataFromDatabase = async (id: string) => {
  try {
    const response = await fetch(BACKEND_URL + `/testData/${id}.json`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};
