interface GameSession {
  id: number;
  creator_id: number;
  game: number;
  start_time: Date;
  end_time: Date;
  notes: string;
  timeout: number;
  code: number;
  created_at: Date;
  updated_at: Date;
}