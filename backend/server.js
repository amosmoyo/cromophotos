// simple server

/*
const http = require('http');

const  port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end("Hello world");
});

server.listen(port);
*/

// complex server

const http = require('http');

const app = require('./app');

const debug = require('debug');

function nomarlizePort( value ) {
  let port = parseInt(value, 10);

  if (isNaN(port)) {
    return value
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = process.env.PORT || '8080';

function onError(err) {
  if (err.syscall !== "listen") {
      throw err;
  }

  const addr = server.address();
  const bind = typeof(addr) === 'string' ? 'pipe' + addr : "port" + port;

  switch(err.code){
    case 'EACCES':
      console.error(bind + "Nor ready");
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is ready');
      process.exit(1);
      break;
    default:
      throw err;
      break;
  }

}

function onListen() {
  const addr = server.address();
  const bind = typeof(addr) === 'string' ? 'pipe' + addr : 'port' + port;
  debug("Listening on" + bind);
}

app.set('port', port);
const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListen);
server.listen(port);
