// url.png에서 위쪽은 기존 방식의 주소체계 이고(url.parse)
//  아래는 WHATWG방식의 주소 체계이다.(url.URL)

const url = require('url');

// 이미지의 아래부분
// WHATWG방식(url.URL)은 search 처리가 편리하다.
const URL = url.URL;
const myURL = new URL(
  'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
);

console.log('new URL()', myURL); // 객체로 찢어 준다.
console.log('url format()', url.format(myURL)); // 하나로 합쳐준다.
console.log('-------------------------------------');
// 이미지의 윗부분
// 기존방식(url.parse)은 호스트가 없을 때도 쓸수 있다.
const parsedUrl = url.parse(
  'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
);
console.log('url.parse()', parsedUrl);
