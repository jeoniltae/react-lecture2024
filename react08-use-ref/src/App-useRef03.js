import React from 'react';

const App = () => {
  const [count, setCount] = React.useState(1);

  // 만약 이 상황에 일반변수를 사용하면 렌더링 될때마다 0으로 초기화되므로 횟수를 알 수 없게 될 것이다. 따라서 변화는 감지해야 되지만 렌더링은 안되야하는 상황에 useRef는 유용하게 사용된다.
  const 랜더카운트 = React.useRef(1);
  React.useEffect(() => {
    console.log('랜더링02', 랜더카운트.current);
    랜더카운트.current = 랜더카운트.current + 1;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>count증가</button>
    </div>
  )
}

export default App;
