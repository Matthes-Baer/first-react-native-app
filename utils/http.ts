//! These are helper functions to access the firebase REST API

//? Post request to add some data to the "testData" segment.
export const addToDatabase = async (inputBody: { name: string }) => {
  try {
    const response = await fetch(
      "https://react-native-project-4a7af-default-rtdb.europe-west1.firebasedatabase.app/testData.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputBody),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//? Get request to read all data from the "testData" segment.
export const readAllDataFromDatabase = async () => {
  try {
    const response = await fetch(
      "https://react-native-project-4a7af-default-rtdb.europe-west1.firebasedatabase.app/testData.json",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
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
