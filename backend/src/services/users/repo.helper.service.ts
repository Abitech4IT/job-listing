import { IUser, User } from "@models/user.model";

const getUserById = async (id: string) => {
  return await User.findById({ id });
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getUserByEmailAndPassword = async (email: string, password: string) => {
  let user = await User.findOne({ email }).select("+password");

  if (user) {
    const isValidPassword = await user.correctPassword(password, user.password);
    if (!isValidPassword) {
      user = null;
    }
  }

  return user;
};

type SignUpUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

const signupUser = async (data: SignUpUserParams): Promise<IUser> => {
  const user = new User();
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.password = data.password;
  user.role = data.role;

  await user.save();
  return user;
};

const repo = {
  getUserById,
  getUserByEmail,
  getUserByEmailAndPassword,
  signupUser,
};

export default repo;
