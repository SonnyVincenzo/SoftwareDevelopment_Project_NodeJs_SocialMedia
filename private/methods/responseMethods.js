
/** Sends web page response with a specified status code and content type.
 * If no statusCode or content is provided, defaults to HTTP 500 with plain text.
 *
 * @param {import('express').Response} response - Response object used to send data to client.
 * @param {number} [statusCode=500] - HTTP status code to send; ex: 200, 404, 500.
 * @param {string} [contentType='text/plain'] - MIME response; ex: 'text/html', 'application/json'.
 * @param {string} [contentText='500 Internal Server Error'] - The content body to send in the response.
 */
export function sendWebResponse(response, statusCode = 500, contentType = 'text/plain', contentText = '500 Internal Server Error') {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(contentText);
    response.end();
}