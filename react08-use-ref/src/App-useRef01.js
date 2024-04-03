import React from 'react';
import './App.css';

// useRef
// 컴포넌트의 생명주기 안에서 값을 유지한다. 즉 새롭게 렌더링 되더라도 값이 변하지 않고 유지한다.
// state와 동일하게 값을 마음대로 변경할 수 있지만, 값이 변경될때 렌더링은 되지 않는다. 즉 변경시 렌더링을 하지 않아야 할 상황에 유용하다.
// 또한 자바스크립트의 getElementById()와 유사하게 DOM요소에 접근할 수 있다.

function App() {
  console.log('랜더링 됨');
  const [count, setCount] = React.useState(0);
  // useRef를 통해 생성한 값은 current라는 key를 가진 객체가 반환된다.
  const countRef = React.useRef(0);

  const 카운트상태값증가 = () => {
    setCount(count + 1);
  };

  const 카운트Ref증가 = () => {
    countRef.current = countRef.current + 1;
    console.log('ref', countRef.current);
  };

  return (
    <div className="App">
      <p>state: {count}</p>
      <p>ref: {countRef.current}</p>
      {/* 버튼을 누를때마다 state가 변경되므로 화면이 새롭게 랜더링된다. */}
      <button onClick={카운트상태값증가}>state증가</button>
      {/* 버튼을 누르면 Ref의 값이 변경되긴 하지만 화면은 랜더링 되지 않는다. */}
      <button onClick={카운트Ref증가}>ref증가</button>
    </div>
  );
}

export default App;
