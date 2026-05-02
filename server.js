/**
 * @file server.js
 * @description Minimal Node.js HTTP server returning a static "Hello, World!"
 *              greeting on the loopback interface (127.0.0.1:3000). Serves as a
 *              didactic reference implementation of the canonical Node.js
 *              HTTP-server idiom: import the core `http` module, create a server
 *              with an inline request handler, and bind it to a hostname/port
 *              with a one-shot listen callback.
 * @author Hello-World Reference Implementation
 */

// Import Node.js's built-in 'http' module from the standard library; this is
// the only dependency of this script (no third-party packages are used).
const http = require('http');

/**
 * The IPv4 loopback address that the HTTP server binds to. Restricting the
 * bind to 127.0.0.1 means the server is reachable only from the same host
 * (localhost); it is NOT reachable from other machines on the network. This
 * loopback-only binding is the de-facto access-control boundary for this
 * server.
 *
 * @constant
 * @type {string}
 * @default '127.0.0.1'
 */
const hostname = '127.0.0.1';
/**
 * The TCP port that the HTTP server listens on. The literal value 3000 must
 * be free on the host at startup time; if another process already holds the
 * port, the listen() call will fail with an EADDRINUSE error. To change the
 * port, edit this literal and restart the process.
 *
 * @constant
 * @type {number}
 * @default 3000
 */
const port = 3000;

/**
 * The single HTTP server instance for this process. Created by
 * `http.createServer(...)` with an inline request handler. Once `listen()` is
 * invoked below, this server begins accepting connections on
 * `${hostname}:${port}`.
 *
 * The inline request handler is the deterministic responder: it sets HTTP
 * status 200, sets `Content-Type: text/plain`, and ends the response with the
 * literal string "Hello, World!\n". It reads no fields of `req` (method, URL,
 * headers, and body are all ignored), so every request — regardless of HTTP
 * method or URL path — receives the same response.
 *
 * @type {import('http').Server}
 * @param {import('http').IncomingMessage} req - The inbound HTTP request
 *        object. Not read by this handler; all request metadata is ignored.
 * @param {import('http').ServerResponse} res - The HTTP response object used
 *        to emit the deterministic greeting back to the client.
 * @returns {void}
 */
const server = http.createServer((req, res) => {
  // Set the HTTP response status code to 200 (OK), indicating success.
  res.statusCode = 200;
  // Declare the response media type as plain text via the Content-Type header.
  res.setHeader('Content-Type', 'text/plain');
  // Write the response body ("Hello, World!\n") and signal that no further
  // data will be written; this finalizes and sends the response to the client.
  res.end('Hello, World!\n');
});

/**
 * Activate the server: bind the configured listener socket to
 * `${hostname}:${port}` and register a one-shot listen callback that fires
 * exactly once after the bind succeeds; it writes a single human-readable
 * readiness line to stdout to confirm that the server is reachable.
 *
 * @returns {void}
 */
server.listen(port, hostname, () => {
  // Emit a single readiness line to stdout once the bind has succeeded.
  // This line is the operator-visible confirmation that the server is up.
  console.log(`Server running at http://${hostname}:${port}/`);
});
