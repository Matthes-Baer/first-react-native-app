//? Hiermit wird dafür gesorgt, dass Nutzer Zugriff auf die database haben bzw. Zugriff auf geschützte Inhalte haben und sich auch ausloggen können.

//! This is important to make it work in TypeScript
const FIREBASE_KEY: string = process.env.FIREBASE_KEY as string;

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        FIREBASE_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        FIREBASE_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
