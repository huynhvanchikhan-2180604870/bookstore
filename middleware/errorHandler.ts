export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error: any) => {
  if (error instanceof AppError) {
    return { error: error.message, statusCode: error.statusCode };
  }
  return { error: "Internal server error", statusCode: 500 };
};
