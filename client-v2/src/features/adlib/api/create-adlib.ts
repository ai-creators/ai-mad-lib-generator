import { z } from "zod";
import { Adlib } from "../models/adlib.model";
import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createAdlibSchema = z.object({
  prompt: z.string().max(100, "Prompt can be at most 100 characters"),
  temperature: z
    .number()
    .min(0, "Temperature must be at least 0")
    .max(2, "Temperature can be at most 2"),
});

export type CreateAdlibInput = z.infer<typeof createAdlibSchema>;

export const createAdlib = ({
  data,
}: {
  data: CreateAdlibInput;
}): Promise<Adlib> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib",
    method: "POST",
    data,
  };

  return api(config);
};

type UseCreateAdlibOptions = {
  mutationConfig?: MutationConfig<typeof createAdlib>;
};

export const useCreateAdlib = ({
  mutationConfig,
}: UseCreateAdlibOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["adlib"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createAdlib,
  });
};
