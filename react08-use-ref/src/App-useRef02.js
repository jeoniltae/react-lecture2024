import React from 'react';
import './App.css';

function App() {
  const [render, setRender] = React.useState(0);
  const countRef = React.useRef(0);
  let countVar = 0;

  const 랜더링됨 = () => {
    setRender(render + 1);
  };

  const 카운트Ref증가 = () => {
    countRef.current = countRef.current + 1;
    console.log('ref', countRef.current);
  };

  const 카운트var증가 = () => {
    countVar = countVar + 1;
    console.log('var', countVar);
  };

  const 결과값출력 = () => {
    console.log(`ref: ${countRef.current}, var: ${countVar}`);
  };

  // state를 변경시키면 그때마다 화면이 새롭게 랜더링된다. 이것은 App()을 재호출하는 것이므로 지역변수로 선언된 countVar는 그때마다 0으로 초기화 된다.
  // 즉 컴포넌트의 생명주기 안에서 값을 유지하고 싶다면 state나 Ref를 사용해야하고 그렇지 않은 경우라면 일반 변수를 사용하면 된다.
  return (
    <div className="App">
      <p>ref: {countRef.current}</p>
      <p>var: {countVar}</p>
      <button onClick={랜더링됨}>렌더링</button>
      <button onClick={카운트Ref증가}>Ref 증가</button>
      <button onClick={카운트var증가}>var 증가</button>
      <button onClick={결과값출력}>Ref/var 증가</button>
    </div>
  );
}

export default App;
