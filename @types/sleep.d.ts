export {};

declare global {
  export interface ISleepData {
    id: 0;
    owner: string;
    slept_date: string;
    slept_time: string;
    is_enough_sleep: boolean;
    used_phone_30_mins_before_sleep: boolean;
    tiredness_level: number;
    ai_advice: string;
  }
}
