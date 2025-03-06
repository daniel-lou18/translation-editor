import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

// Generic type parameters:
// TData: The successful response data type
// TVariables: The variables/payload type
// TError: The error type (usually AxiosError)
// TContext: The context returned from onMutate (for rollbacks)

type MutationBaseOptions<TData, TVariables, TError, TContext> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined
  ) => void | Promise<unknown>;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ) => void | Promise<unknown>;
} & Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

export function useBaseMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: MutationBaseOptions<TData, TVariables, TError, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { mutationFn, onSuccess, onError, ...restOptions } = options;

  return useMutation({
    mutationFn,
    onSuccess,
    onError,
    ...restOptions,
  });
}
