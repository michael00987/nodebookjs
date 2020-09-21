/**아래 코드는 실행되는 코드는 아니다. */

Users.findOne('zero')
  .then((user) => {
    console.log(user);
    return Users.update('zero', 'nero');
  })
  .then((updatedUser) => {
    console.log(updatedUser);
  })
  .then((removedUser) => {
    console.log(removeUser);
  })
  .catch((err) => {
    console.error(error);
  });
console.log('다 찾았니?');

// ----------------------------------

// promise 를 async await 로 변환한 것이다.

const findUser = async () => {
  try {
    const user = await Users.findOne('zero');
    console.log(user);
    const updatedUser = await Users.update('zero', 'nero');
    console.log(updatedUser);
    const removedUser = await Users.remove('nero');
    console.log(removedUser);
    console.log('다 찾았니?');
  } catch (e) {
    console.error(e);
  }
};
findUser();

// 위코드 처럼 에러 처리를 해줄수 있으나, 에러를 한번에 처리하기 때문에 어디에서 에러가 난지 모른다.

// ----------------------------------

// 아래와 같이 각각 에러처리를 해야한다. 하지만 이렇게 하면 코드가 지저분해 진다
const findUser = async () => {
  try {
    const user = await Users.findOne('zero');
    console.log(user);
  } catch (e) {
    console.error(e);
  }
  try {
    const updatedUser = await Users.update('zero', 'nero');
    console.log(updatedUser);
  } catch (e) {
    console.error(e);
  }
  try {
    const removedUser = await Users.remove('nero');
    console.log(removedUser);
  } catch (e) {
    console.error(e);
  }
  console.log('다 찾았니?');
};
findUser();
