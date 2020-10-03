const SocketIo = require('socket.io');

module.exports = (server) => {
  const io = SocketIo(server, {path: '/socket.io'}); // 클라이언트의 path 와 일치해야 한다.

  io.on('connection', (socket) => {
    const req = socket.request; // 클라이언트에서 넘어오는 데이터는 socket.request 에 담긴다.
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!!', ip, socket.id, req.ip);
    // disconnect 와 error 는 정해져 있는 이벤트 이름이다.
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    // message, relpay 는 다른 이름으로 해도 된다. 그리고 여러개를 만들수 있다.
    socket.on('message', (data) => {
      console.log(data);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });
    const interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.io'); // 프론트에서 on('news')로 받을수 있다.
    }, 3000);
  });
};
