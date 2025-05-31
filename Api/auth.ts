import { Image } from "react-native";
import instance from ".";
import UserType from "../types/usertype";
import { storeToken } from "./store";

const login = async (user: UserType) => {
  const { data } = await instance.post("/auth/login", user);
  if (data.token) {
    await storeToken(data.token);
  }
  return data;
};

const register = async (username: string, password: string, image: string) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", {
      name: "profile.jpeg",
      uri: image,
      type: "image/jpeg",
    } as any);
    const { data } = await instance.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.token) {
      await storeToken(data.token);
    }
    return data;
  } catch (error) {
    console.error("Error in register function:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const getMyProfile = async () => {
  const { data } = await instance.get("/auth/me");

  return data;
};
const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

const updateProfile = async (image: Image) => {
  const { data } = await instance.put("/auth/profile");
  return data;
};

const getTransactions = async () => {
  const { data } = await instance.get("/transactions/my");
  return data;
};

const getUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

const depositFunds = async (amount: number) => {
  const { data } = await instance.post("/transactions/deposit", { amount }); //check if syntax is correct
  return data;
};

const withdrawFunds = async (amount: number) => {
  const { data } = await instance.put("/transactions/withdraw", { amount }); //check if syntax is correct

  return data;
};

const transferToUser = async (amount: number, username: string) => {
  const { data } = await instance.put("/transactions/transfer", {
    amount,
    username,
  }); //check if syntax is correct
  return data;
};
const getOneUser = async (userId: string) => {
  const { data } = await instance.get(`/auth/user/${userId}`); //check error
  return data;
};
export {
  depositFunds,
  getAllUsers,
  getMyProfile,
  getOneUser,
  getTransactions,
  getUsers,
  login,
  register,
  transferToUser,
  updateProfile,
  withdrawFunds,
};

// import instance from ".";
// import UserType from "../types/usertype";
// import { storeToken } from "./store";

// const login = async (user: UserType) => {
//   const { data } = await instance.post("/auth/login", user);
//   if (data.token) {
//     await storeToken(data.token);
//   }
//   return data;
// };

// const register = async (username: string, password: string, image: string) => {
//   try {
//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("password", password);
//     formData.append("image", {
//       name: "profile.jpg",
//       uri: image,
//       type: "image/jpeg",
//     } as any);
//     const { data } = await instance.post("/auth/register", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     if (data.token) {
//       await storeToken(data.token);
//     }
//     return data;
//   } catch (error) {
//     console.error("Error in register function:", error);
//     throw error; // Re-throw the error to handle it in the calling function
//   }
// };

// const me = async () => {
//   const { data } = await instance.get("/auth/me");

//   return data;
// };
// const getAllUsers = async () => {
//   const { data } = await instance.get("/auth/users");
//   return data;
// };

// export { getAllUsers, login, me, register };
