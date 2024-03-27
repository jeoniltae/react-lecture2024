import './App.css';

// 이벤트는 자식 컴포넌트가 부모 컴포넌트로 데이터를 전달하는 용도로도 사용된다.
function MyBody(props) {
  const liTag1 = [], liTag2 = [];

  for (let i = 0; i < props.propData1.length; i++) {
    console.log(props.propData1[i])
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }

  let keyCnt = 0;
  for (const row of props.propData2) {
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }

  return (
    <>
      <h2>React 기본</h2>
      {/* 첫번째 경고창은 고정된 메세지를 알림창으로 띄워준다. props로 전달된 기능을 자식 컴포넌트에서 그대로 사용하는 형식이다. */}
      <ol>
        <li><a href="/" onClick={() => { props.onMyAlert1(); }}>프론트엔드</a>
          <ul>
            {liTag1}
          </ul>
        </li>
        {/* 이벤트 객체를 통해 화면이 새로고침 되지 않도록 요청을 중단시킴. 리액트는 비동기방식으로 화면을 전환하므로 화면이 새로고침이 되면 안된다. 이럴경우 초기화면으로 전환되기 때문이다. */}
        <li><a href="/" onClick={(e) => {
          e.preventDefault();
          props.onMyAlert2('백엔드');
        }}>백엔드</a>
          <ul>
            {liTag1}
          </ul>
        </li>
        <li></li>
      </ol>
    </>
  );
}

function App() {
  const myData1 = ['HTML5', 'CSS3', 'javascript', 'jQuery'];
  const myData2 = ['java', 'oracle', 'jsp', 'spring boot'];

  return (
    <div className="App">
      <MyBody propData1={myData1} propData2={myData2} onMyAlert1={() => { alert('알림!') }} onMyAlert2={(msg) => { alert(msg) }} />
    </div>
  );
}

export default App;
