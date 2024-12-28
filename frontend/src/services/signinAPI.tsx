import { createContext, useContext, useEffect, useState } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IUser, LoginResponse, UserContextType, UserTypes } from "../types";
import { baseURL } from "../constant";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { data: userData, isLoading: isVerifying } = useQuery({
    queryKey: ["verifyUser"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseURL}/auth/verify`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        return response.data;
      } catch (error) {
        console.error("Verification error:", error);
        setUser(undefined);
        throw error;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (userData?.user) {
      setUser(userData.user);
    }
  }, [userData]);

  const signinMutation = useMutation<LoginResponse, AxiosError, UserTypes>({
    mutationFn: async (usercredential: UserTypes) => {
      const response = await axios.post<LoginResponse>(
        `${baseURL}/auth/login`,
        usercredential,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
      setUser(undefined);
    },
  });

  const signin = (
    usercredential: UserTypes,
    options?: UseMutationOptions<LoginResponse, AxiosError, UserTypes>
  ) => signinMutation.mutate(usercredential, options);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signin,
        isLoading: signinMutation.isPending || isVerifying,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
