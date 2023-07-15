/**
 * Express API error handler.
 */
export default function errorHandler(error, request, response, next) {
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}
