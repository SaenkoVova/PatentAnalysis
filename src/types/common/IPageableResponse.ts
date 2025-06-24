export interface IPageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}
