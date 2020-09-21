console.log(global);

const interval = global.setInterval(() => {}, 1000);
global.clearInterval(interval);
const timeout = global.setTimeout(() => {}, 1000);
global.clearTimeout(timeout);
const immediate = global.setImmediate(() => {});
global.clearImmediate(immediate);

// 전역게 있기 때문에 global은 생략할수 있다.
