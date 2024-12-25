import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface Job {
  id?: string;
  title: string;
  postDate?: string;
  type: string;
  company: string;
  location: string;
  tags: string[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface JobsResponse {
  status: string;
  message: string;
  data: Job[];
}

export type UserTypes = {
  email: string;
  password: string;
};

export interface LoginResponse {
  status: string;
  token: string;
  user: IUser;
}

export interface UserContextType {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
  signin: (
    usercredential: UserTypes,
    options?: UseMutationOptions<LoginResponse, AxiosError, UserTypes>
  ) => void;
  isLoading: boolean;
  error: string | null;
}

export type ErrorResponse = {
  message: string;
};
