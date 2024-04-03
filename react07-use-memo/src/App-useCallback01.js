import React from 'react';

const App = () => {
  const [countNum, setCountNum] = React.useState(0);
  const [rendomNum, setRendomNum] = React.useState(0);

  // state변경에 의해 컴포넌트가 새롭게 렌더링 되면 함수는 그때마다 새롭게 할당된다. 즉 참조값이 계속 바뀌게 되므로 useEffect가 그때마다 실행되게 된다.
  // 이유는 자바스크립트에서 함수는 객체이기 때문이다.

  // step1
  // const somethingGood = () => {
  //   console.log(`somethingGood호출: ${countNum}, ${rendomNum}`);
  //   return;
  // };

  // step2
  // useCallback을 적용하여 렌더링시 단 한번만 함수를 캐시에 저장한다. 하지만 의존성 배열을 빈값으로 주면 한번만 실행되므로 state의 변경을 감지할 수 없게 된다. 최초 실행시의 초기값만 가진 상태이기 때문이다.
  // countNum가 변경될때만 새롭게 메모이제이션 하므로 변경된 state를 감지할 수 있다.
  const somethingGood = React.useCallback(() => {
    console.log(`somethingGood호출: ${countNum}, ${rendomNum}`);
    return;
    // }, []);
  }, [countNum, rendomNum]);

  React.useEffect(() => {
    console.log('somethingGood 또는 randomGood 변경됨');
  }, [somethingGood]);

  return (
    <div>
      <h2>useCallback()</h2>
      <input type="number" value={countNum} onChange={e => setCountNum(e.target.value)} />
      <button onClick={() => setRendomNum(Math.random)}>난수: ${rendomNum}</button>
      <br />
      <button onClick={somethingGood}>somethingGood호출</button>
    </div>
  )
}

export default App;
