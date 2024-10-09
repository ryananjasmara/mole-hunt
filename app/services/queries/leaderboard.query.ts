import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { ILeaderboard, IPostLeaderboardRequest, IPostLeaderboardResponse } from '@/app/shared/types/leaderboard.type';
import { LeaderboardApi } from '../apis/leaderboard.api';

export const usePostLeaderboard = (): UseMutationResult<
  IPostLeaderboardResponse,
  unknown,
  IPostLeaderboardRequest,
  unknown
> => {
  const mutation = useMutation<
    IPostLeaderboardResponse,
    unknown,
    IPostLeaderboardRequest,
    unknown
  >({
    mutationKey: ['leaderboard.postLeaderboard'],
    mutationFn: async (data: IPostLeaderboardRequest) => {
      const response = await LeaderboardApi.postLeaderboard(data);
      return response.data as IPostLeaderboardResponse;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};

export const useGetLeaderboard = (): UseQueryResult<ILeaderboard[], unknown> => {
  const query = useQuery<ILeaderboard[], unknown>({
    queryKey: ['leaderboard.getLeaderboard'],
    queryFn: async () => {
      const response = await LeaderboardApi.getLeaderboard();
      return response.data.data as ILeaderboard[];
    },
    retry: 0,
  });

  return query;
};
