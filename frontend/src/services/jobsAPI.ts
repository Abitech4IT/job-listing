import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Job, JobResponse, JobsResponse } from "../types";
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

export const useJobById = (jobId: string) => {
  const {
    data: job,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const response = await axios.get<JobResponse>(
        `${baseURL}/jobs/${jobId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    enabled: !!jobId,
  });

  if (error) {
    console.error("Error fetching job:", error);
  }

  return { job, isLoading };
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

type updateParams = { id: string; updateJob: Job };

export const useEditJob = () => {
  const queryClient = useQueryClient();

  const { mutate: editJob, isPending: isLoading } = useMutation({
    mutationFn: async ({ id, updateJob }: updateParams) => {
      const response = await axios.patch(`${baseURL}/jobs/${id}`, updateJob, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  return { editJob, isLoading };
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteJob, isPending: isLoading } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${baseURL}/jobs/${id}`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  return { deleteJob, isLoading };
};
