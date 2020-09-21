const url = require('url');
const querystring = require('querystring');

const parseedUrl = url.parse(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
);
const query = querystring.parse(parseedUrl.query);
console.log('querystring.parse()', query); // 도메인 뒤에 있는 쿼리 스크링을 객체로 핸들링할수 있다.
console.log('querystring.stringify()', querystring.stringify(query)); // 쿼리스트링을 하나로 합친다.
