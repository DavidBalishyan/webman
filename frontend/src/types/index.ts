// types/index.ts
export interface ApiResponse {
  status: number;
  time: number;
  size: string;
  headers: Record<string, string>;
  body: string;
}