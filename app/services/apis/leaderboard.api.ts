import { IPostLeaderboardRequest } from "@/app/shared/types/leaderboard.type";
import { HttpServices } from "../HttpServices";

export class LeaderboardApi extends HttpServices {
  static getLeaderboard() {
    return this.get("/api/v1/leaderboards");
  }

  static postLeaderboard(data: IPostLeaderboardRequest) {
    return this.post("/api/v1/leaderboards", { ...data });
  }
}
