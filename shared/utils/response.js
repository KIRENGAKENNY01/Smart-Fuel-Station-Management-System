export const response = (res, statusCode, message, payload = null, meta = null) => {
  const success = statusCode >= 200 && statusCode < 400;
  const resBody = { success, message };
  
  if (success) {
    if (payload !== null) resBody.data = payload;
    if (meta) resBody.meta = meta;
  } else {
    // If error, payload is the error detail
    if (payload !== null) resBody.error = payload;
  }

  return res.status(statusCode).json(resBody);
};
