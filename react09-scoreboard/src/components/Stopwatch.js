import React, { useRef, useState } from "react";

export default function Stopwatch() {

  // false면 정지 상태
  const [timerFlag, setTimerFlag] = useState(false);
  // 타이머
  let [ticker, setTicker] = useState(0);
  // setInterval함수로 동작되는 타이머를 정지할때는 해당 참조변수를 통해 clearInterval함수를 호출 한다. 렌더링이 될 때마다 그 값이 바뀌면 안되므로 useRef()를 통해 변수를 선언한다.
  let timerRef = useRef(0);

  // 1초에 한 번씩 콜백함수를 호출해서 시간을 1초씩 증가
  const startTimer = () => {
    ticker++;
    // setInterval함수의 참조값을 Ref에 할당 한다.
    timerRef.current = setInterval(() => {
      console.log('틱톡');
      setTicker(ticker++);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      <span className="stopwatch-time">{ticker}</span>
      {/* 앱을 최초 실행했을때는 타이머가 멈춘 상태이므로 start를 출력하고, 버튼을 누를때마다 토글이 된다. */}
      <button onClick={() => {
        setTimerFlag(!timerFlag);
        timerFlag ? stopTimer() : startTimer();
      }}>{(timerFlag) ? 'Stop' : 'Start'}</button>
      <button onClick={() => {
        if (timerFlag) {
          alert('스톱워치가 동작중입니다.');
        } else {
          setTicker(0);
        }
      }}>Reset</button>
    </div>
  </>);
}