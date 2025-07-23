export interface SupabaseResponse {
  isSuccess: boolean,
  url: string,
  body: string,
  error: string,
  statusCode: number
}