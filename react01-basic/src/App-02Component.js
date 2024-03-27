import './App.css';

/** 컴포넌트 만들기
 * 리액트에서는 함수형 컴포넌트와 클래스형 컴포넌트를 사용할 수 있다.
 * 초기 버전에서는 클래스형만 사용했지만, 리액트 훅이 출시된 16.8버전 이후에는 함수형을 기본으로 사용하고 있다.
 */
function MyBody() {
  return (
    <>
      <h2>React 기본</h2>
      <ol>
        <li>프론트엔드
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>javascript</li>
            <li>jQuery</li>
          </ul>
        </li>
        <li>백엔드
          <ul>
            <li>java</li>
            <li>oracle</li>
            <li>jsp</li>
            <li>spring boot</li>
          </ul>
        </li>
      </ol>
    </>
  );
}

/** React에서 최상위 컴포넌트가 App이다. 해당 컴포넌트 하위에 자식 컴포넌트를 추가하면서 UI를 구성하게 된다. */
function App() {
  return (
    // className속성은 HTML에서 사용하는 class속성이라 생각하면 된다. JS에는 이미 class라는 예약어가 있으므로 사용시 경고가 발생된다.
    <div className="App">
      <MyBody />
    </div>
  );
}

export default App;
