const mongoose = require('mongoose');
module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect(
      'mongodb://root@localhost:27017/admin',
      {
        dbName: 'nodejs',
      },
      (err) => {
        if (err) {
          console.log('몽고디비 연결 에러', err);
        } else {
          console.log('몽고디비 연결 성공');
        }
      }
    );
  };
  connect();
  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });
  mongoose.connection.on('disconnected', (error) => {
    console.error('몽고디비 연결이 끊겼ㅅ브니다. 연결을 재시도 합니다.');
    connect();
  });
  require('./user');
  require('./comment');
};
