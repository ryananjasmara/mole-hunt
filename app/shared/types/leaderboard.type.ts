export interface ILeaderboard {
  name: string;
  score: number;
  rank: number;
}

export interface IGetLeaderboardResponse {
  data: ILeaderboard[];
}

export interface IPostLeaderboardRequest {
  name: string;
  score: number;
}

export interface IPostLeaderboardResponse {
  message: string;
}
