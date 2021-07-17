export {};

declare global {
  export interface IUser {
    username: string;
    name: string;
    weight_kg: number;
    average_sleep_time: string;
    bedtime_starts_at: string;
    date_joined: Date;
  }
}
