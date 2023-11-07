import User from "../models/user";
import bcrypt from "bcrypt";

let preseedUsers = [
  {
    name: "owner",
    email: "owner@gmail.com",
    password: "12345678",
    conformPassword: "12345678",
  },
  {
    name: "User1",
    email: "hanzla@gmail.com",
    password: "12345678",
    conformPassword: "12345678",
  },
];

export const saveUsers = async () => {
  await preseedUsers.forEach(async (user) => {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  });
  await User.deleteMany({});
  await User.insertMany(preseedUsers);
};

saveUsers();
