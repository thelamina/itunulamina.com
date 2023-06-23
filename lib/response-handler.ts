export const ResponseHandler = (data: any, message: string, status: number) => {
  return {
    message,
    data,
    status,
  };
};
