import React from 'react';

const App = () => {
  const [num, setNum] = React.useState(0);
  const [switching, setSwitching] = React.useState(true);

  // :::step1:::
  // const switchMode = switching ? 'ON' : 'OFF';

  // :::step2:::
  // 자바스크립트에서 객체는 선언할때마다 새로운 참조값을 할당받게된다. 즉 새로운 렌더링을 위해 App컴포넌트가 호출될떄마다 참조값이 변경된다. 따라서 useEffect()가 지속적으로 호출된다.
  // const switchMode = {
  //   nowState: switching ? 'ON' : 'OFF',
  // };

  // :::step3:::
  const switchMode = React.useMemo(() => {
    return {
      nowState: switching ? 'ON' : 'OFF',
    };
  }, [switching]);

  // setp1: switchMode가 변경될때만 호출되도록 설정
  React.useEffect(() => {
    console.log('useEffect호출 됨');
  }, [switchMode]);

  return (
    <div>
      <h2>정수 카운터</h2>
      <input type="number" value={num} onChange={e => setNum(e.target.value)} />
      <hr />
      <h2>토글 스위치</h2>
      {/* <p>스위치 상태(step1): {switchMode}</p> */}
      <p>스위치 상태(step1): {switchMode.nowState}</p>
      <button onClick={() => setSwitching(!switching)}>스위치 조작</button>
    </div>
  )
}

export default App;
