import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../constant";

type UserTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const useSignUp = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: async (newUser: UserTypes) => {
      const response = await axios.post(`${baseURL}/auth/signup`, newUser, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return { signup, isLoading };
};
