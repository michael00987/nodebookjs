const { URL } = require('url');
const myURL = new URL(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
);
console.log(myURL.searchParams);

console.log(myURL.searchParams.getAll('category')); // 인자의 속성을 가진 값을 배열로 뽑아낼수 있다.
console.log(myURL.searchParams.get('category')); // 인자의 속성을 가진 값이 여러개 일때 0번째 item만 가지고 온다.
console.log(myURL.searchParams.get('limit')); // 인자의 속성을 가진 값을 하나만 가지고 온다.
console.log(myURL.searchParams.has('page')); // 가지고 있는지 확인하고 bool 값을 리턴한다.

console.log(myURL.searchParams.keys()); // 가지고 있는 key를 출력한다.
console.log(myURL.searchParams.values()); // 가지고 있는 값을 출력한다.

console.log(myURL.searchParams.getAll('filter')); // filter 라는 key가 없기 때문에 빈 배열을 반환한다.
myURL.searchParams.append('filter', 'es3'); // filter 라는 key 에 값으로 es3를 추가한다.         &filter=es3    (추가:append)
myURL.searchParams.append('filter', 'es5'); // filter 라는 key 에 값으로 es5를 추가한다.         &filter=es3&filter=es5 (추가:append)
console.log(myURL.searchParams.getAll('filter')); // filter 라는 key를 가진 값을 배열로 반환한다.

myURL.searchParams.set('filter', 'es6'); // filter 라는 key에 값을 es6 로 정의  &filter=es3&filter=es5  => &filter=es6  (수정:set)
console.log(myURL.searchParams.getAll('filter')); // 앞에 추가한 es3, es5 가 es6로 변경 된것을 확인할수 있다.

// console.clear();

myURL.searchParams.delete('filter'); //filter 를 key 로 하고 있는 값을 삭제
console.log(myURL.searchParams.getAll('filter'));
력;
console.log(myURL.searchParams.toString());
// myURL.search = myUrl.searchParams.toString();    // 위에서 수정한 내용을 한줄로 연결한 결과를 출력

// 간혹 /hello?page=10  이렇게 도메인을 제외한 나머지 주소를 사용할때가 있다. 이때는 url.URL WHATWG 방식으로는 처리할수 없다.
// 이때는 url.parse 방식으로 하면 간단하다.
