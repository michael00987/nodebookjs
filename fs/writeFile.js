const fs = require('fs');

fs.writeFile('./writeme.txt', '글을 써 주세요', (err) => {
  if (err) {
    throw err;
  }
  fs.readFile('./writeme.txt', (err, data) => {
    console.log(data.toString());
  });
});
