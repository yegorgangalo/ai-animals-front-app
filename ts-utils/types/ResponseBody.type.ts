export type ResponseBody<T> = { data: T; success: boolean; error: { message: string } }
export type SuccessResponseBody<T> = Omit<ResponseBody<T>, 'error'>
export type ErrorResponseBody<T> = Omit<ResponseBody<T>, 'data'>
