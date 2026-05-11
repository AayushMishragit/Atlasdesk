export * from './project';
export * from './task';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
