const http = require("http");
const app = require("./app");

// set up the port number
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// make the server to listen on the assigned port number
server.listen(PORT, console.log(`Server is listening on port ${PORT}`));