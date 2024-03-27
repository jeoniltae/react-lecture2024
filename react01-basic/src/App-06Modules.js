import React, { useState } from 'react';
import './App.css';
import ViewComponent from './component/ViewComponent';
import WriteComponent from './component/WriteComponent';
import ListComponent from './component/ListComponent';

function App() {
  // state를 정의한 후 초기값은 list를 할당. 이 state를 변경할 수 있는 함수는 setMode()로 정의.
  const [mode, setMode] = useState('list');
  // 각 컴포넌트를 저장하기 위한 변수
  let contents = '';

  // 각 mode에 따라 컴포넌트를 변수에 할당.
  if (mode === 'view') {
    contents = <>
      <ViewComponent changeMode={(pmode) => setMode(pmode)} />
    </>
  } else if (mode === 'write') {
    contents = <>
      <WriteComponent changeMode={(pmode) => setMode(pmode)} />
    </>
  } else {
    contents = <>
      <ListComponent changeMode={(pmode) => setMode(pmode)} />
    </>
  }

  // 최종적으로 컴포넌트를 랜더링 함.
  return (
    <div className="App">
      <h2>React - 모듈화</h2>
      {contents}
    </div>
  );
}

export default App;
