const SocketIo = require('socket.io');
const axios = require('axios');
const cookieParser=require('cookie-parser')
const cookie=require('cookie-signature')

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIo(server, { path: '/socket.io'}); // 클라이언트의 path 와 일치해야 한다.

  app.set('io', io); 

  // 네임스페이스
  const room = io.of('/room'); // room 목록에 대해서만 통신
  const chat = io.of('/chat'); // chat 내용에 대해서만 통신
  
  // 익스프레스 미들웨어를 소켓io에서 쓰는 방법
  io.use((socket, next) => { 
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
  });
  io.use((socket, next) => { 
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임 스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네입스페이스 접속');
    const req = socket.request;
    const {
      headers: {referer},
    } = req;
    const roomId = referer
    .split('/')[referer.split('/').length - 1]
    .replace(/\?.+/, '');
    socket.join(roomId) //  방에 접속

    // socket.to(roomId).emit('join', {
    //   user: 'system',
    //   chat: `${req.session.color}님이 입장하셨습니다.`,
    //   number:socket.adapter.rooms[roomId].length,
    // });
    axios.post(`http://localhost:8005/room/${roomId}/sys`,{
      type: 'join',
      },{
      headers:{      
      Cookie: `connect.sid=s%3A${cookie.sign(req.signedCookies['connect.sid'],process.env.COOKIE_SECRET)}`
      },
    })
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId); // 방 나가기
      
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if (userCount === 0) {
        axios
          .delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // socket.to(roomId).emit('exit', {
        //   user: 'system',
        //   chat: `${req.session.color}님이 퇴장하셨습니다.`,
        //   number:socket.adapter.rooms[roomId].length
        // });
        axios.post(`http://localhost:8005/room/${roomId}/sys`,{
          type:'exit',
        },{
          headers:{
          Cookie: `connect.sid=s%3A${cookie.sign(req.signedCookies['connect.sid'],process.env.COOKIE_SECRET)}`
          }
        })
      }
    });
  });

  // io.on('connection', (socket) => {
  //   const req = socket.request; // 클라이언트에서 넘어오는 데이터는 socket.request 에 담긴다.
  //   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //   console.log('새로운 클라이언트 접속!!', ip, socket.id, req.ip);
  //   // disconnect 와 error 는 정해져 있는 이벤트 이름이다.
  //   socket.on('disconnect', () => {
  //     console.log('클라이언트 접속 해제', ip, socket.id);
  //     clearInterval(socket.interval);
  //   });
  //   socket.on('error', (error) => {
  //     console.error(error);
  //   });
  //   // message, relpay 는 다른 이름으로 해도 된다. 그리고 여러개를 만들수 있다.
  //   socket.on('message', (data) => {
  //     console.log(data);
  //   });
  //   socket.on('reply', (data) => {
  //     console.log(data);
  //   });
  //   const interval = setInterval(() => {
  //     socket.emit('news', 'Hello Socket.io'); // 프론트에서 on('news')로 받을수 있다.
  //   }, 3000);
  // });
};
