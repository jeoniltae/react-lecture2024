import { useState } from 'react';
import './App.css';

const WriteForm = (props) => {
  return (
    // submit 이벤트 리스너를 통해 폼값을 처리한다.
    <form onSubmit={(e) => {
      // 이벤트 객체를 통해 submit을 차단한다.
      e.preventDefault();
      // 이벤트의 target속성을 통해 입력한 폼 값을 얻어온다.
      let writer = e.target.writer.value;
      let title = e.target.title.value;
      let contents = e.target.contents.value;
      // 이벤트 리스너 안에서는 이벤트객체를 매개변수로 받을 수 있다.
      console.log(e)
      // 부모 컴포넌트에서 props로 전달해준 함수를 호출.
      props.writeAction(title, writer, contents);
    }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer" /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title" /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea type="text" name="contents" cols="22" row="3" />
            </td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="전송" />
    </form>
  );
};

function App() {
  const [msg, setMsg] = useState('폼값 검증 진행중');

  return (
    <div className="App">
      <h2>React - form값 처리</h2>
      {/* 작성폼 컴포넌트를 추가하면서 props를 통해 폼값을 받아 콘솔에 출력하는 함수를 전달한다. 3가지 모두 빈값이 아니라면 state를 완료로 변경. */}
      <WriteForm writeAction={(wr, ti, con) => {
        console.log('form값', wr, ti, con);
        if (wr !== '' && ti !== '' && con !== '') {
          setMsg('폼값 검증 완료');
        }
      }} />
      <p>{msg}</p>
    </div>
  );
}

export default App;
