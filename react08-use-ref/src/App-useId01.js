import React, { useId } from 'react';

const App = () => {
  // useId()는 고유한 아이디를 생성해준다. DOM의 아이디를 부여하거나 라벨링을 할 때 편리하다.
  const myId = useId();
  console.log('useId', myId);

  return (
    <div>
      <MyInput />
    </div>
  )
}

const MyInput = () => {
  const ageId = useId();
  console.log('useId', ageId);

  return (
    <div>
      {/* HTML속성을 사용 */}
      <label htmlFor="name">이름</label>
      <input type="text" id="name" />
      <br />

      {/* useId훅 사용 */}
      <label htmlFor={ageId}>나이</label>
      <input type="text" id={ageId} />
    </div>
  );
};

export default App;