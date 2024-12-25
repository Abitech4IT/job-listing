import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Job, JobsResponse } from "../types";
import { baseURL } from "../constant";

type FilterOption = {
  tags?: string[];
};

export const useJobs = (filters: FilterOption) => {
  const {
    data: jobs,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const tagsQuery = filters?.tags?.join(",") || undefined;
      const response = await axios.get<JobsResponse>(`${baseURL}/jobs`, {
        params: { tags: tagsQuery },
        withCredentials: true,
      });
      return response.data;
    },
  });
  if (error) {
    console.error("Error fetching jobs:", error);
  }

  return { jobs, isLoading };
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending: isLoading } = useMutation({
    mutationFn: async (newJob: Job) => {
      const response = await axios.post(`${baseURL}/jobs/create`, newJob, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
        filters: {},
      });
    },
  });

  return { create, isLoading };
};
