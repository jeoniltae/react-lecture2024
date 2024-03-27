import './App.css';

/**
 * props
 * : React에서 상태를 저장하기 위한 값으로 부모 컴포넌트가 자식 컴포넌트로 전달하는 읽기 전용 데이터를 말한다. 전달시에는 html의 속서처럼 기술한다.
 * App 컴포넌트에서 2개의 props를 전달함.
 */
function MyBody(props) {
  // 빈 배열을 생성
  const liTag1 = [], liTag2 = [];

  // propData1로 전달된 프론트엔드 관련 데이터는 일반 for문을 통해 길이만큼 반복한다.
  for (let i = 0; i < props.propData1.length; i++) {
    console.log(props.propData1[i])
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }

  // 반복적으로 출력되는 항목에 중복되지 않는 key라는 이름의 prop를 쓰도록 권고.

  // 백엔드 관련 props는 for ~ of문을 통해 반복 삽입한다.
  // 이 for문은 배열의 크기만큼 자동으로 반복하는 기능이 있다.
  let keyCnt = 0;
  for (const row of props.propData2) {
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }

  return (
    <>
      <h2>React 기본</h2>
      <ol>
        <li>프론트엔드
          <ul>
            {liTag1}
          </ul>
        </li>
        <li>백엔드
          <ul>
            {liTag1}
          </ul>
        </li>
      </ol>
    </>
  );
}

function App() {
  const myData1 = ['HTML5', 'CSS3', 'javascript', 'jQuery'];
  const myData2 = ['java', 'oracle', 'jsp', 'spring boot'];

  return (
    <div className="App">
      <MyBody propData1={myData1} propData2={myData2} />
    </div>
  );
}

export default App;
