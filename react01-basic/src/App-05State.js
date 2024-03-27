import React, { useState } from 'react'
import './App.css';

function Top(props) {
  return (
    <h2><a href="/" onClick={(e) => {
      e.preventDefault();
      // props로 전달된 함수를 호출한다. 이때 인수로 'both'를 전달하면 state가 해당값으로 변경됨.
      props.myModeChange('both');
    }}>React 기본</a></h2>
  );
};

function MyCont1(props) {
  return (
    <>
      <li><a href="/" onClick={((e) => {
        e.preventDefault();
        props.myModeChange('front');
      })}>프론트엔드</a>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>javascript</li>
          <li>jQuery</li>
        </ul>
      </li>
    </>
  );
};

function MyCont2(props) {
  return (
    <>
      <li><a href="/" onClick={((e) => {
        e.preventDefault();
        props.myModeChange('back');
      })}>백엔드</a>
        <ul>
          <li>java</li>
          <li>oracle</li>
          <li>jsp</li>
          <li>spring boot</li>
        </ul>
      </li>
    </>
  );
};

// 리액트 훅 :
// 함수형 컴포넌트에서 state와 라이프 싸이클을 연동할 수 있게 해주는 특수한 함수를 말함.
// 훅은 임포트를 먼저 진행한 후 usexxx()와 같은 패턴의 함수를 아래와 같이 사용하면 된다.
// useState(): 리액트에서 상태값을 가지는 state의 값을 변경하거나 초기값을 부여할 때 사용한다. 이 함수의 반환값은 배열인데 0번 요소는 getter, 1번 요소는 setter로 사용할 수 있다.
/**
 * const myState = useState('99');
 * const getTs = myState[0]; => 초기값인 99를 변수에 할당
 * const setTs = myState[1]; => 값을 변경할 수 있는 함수로 지정 됨.
 * 
 * 위 문법을 구조분해할당을 통해 축약할 수 있음.
 * const [getTs, setTs] = useState('99');
 */
function App() {
  const [mode, setMode] = useState('both');
  // state의 값은 임의로 변경할 수 있으나 그럴경우 화면이 재 랜더링 되지 않음. 따라서 화면의 전환을 위해서는 반드시 변환함수를 통해서 값을 변경해야 한다.

  // 컴포넌트를 저장하기 위한 변수 선언
  let contents = '';

  if (mode === 'front') {
    contents = <>
      <MyCont1 myModeChange={(mode) => {
        setMode(mode);
      }} />
    </>
  } else if (mode === 'back') {
    contents = <>
      <MyCont2 myModeChange={(mode) => {
        setMode(mode);
      }} />
    </>
  } else {
    contents = <>
      <MyCont1 myModeChange={(mode) => {
        setMode(mode);
      }} />
      <MyCont2 myModeChange={(mode) => {
        setMode(mode);
      }} />
    </>
  }

  return (
    <div className="App">
      {/* 부모컴포넌트인 App에서 자식컴포넌트인 Top으로 props를 통해 함수를 전달한다. 매개변수 mode를 통해 데이터를 받은 후 state를 변경할 수 있는 함수를 호출하는 기능을 가지고 있다. */}
      <Top myModeChange={(mode) => { setMode(mode) }} />
      <ol>
        {/* 위에서 if문을 통해 mode가 어떤값인지에 따라서 설정된 컴포넌트를 이 위치에 랜더링한다. */}
        {contents}
      </ol>
    </div>
  );
}

export default App;
