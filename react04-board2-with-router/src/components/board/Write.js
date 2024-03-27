import React, { Link } from 'react-router-dom';

const Write = (props) => {
  // state 관련값과 함수를 props로 받는다.
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const navigate = props.navigate;
  const nowDate = props.nowDate;

  return <>
    <header>
      <h2>게시판 - 작성</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      <form onSubmit={(e) => {
        e.preventDefault();

        let w = e.target.write.value;
        let t = e.target.title.value;
        let c = e.target.contents.value;

        // 추가할 객체 생성
        let addBoardData = {
          no: nextNo,
          Write: w,
          title: t,
          contents: c,
          date: nowDate(),
        };

        // 복사본을 통해 새로운 객체 추가
        let copyBoardData = [...boardData];
        copyBoardData.push(addBoardData);

        // state를 변경
        setBoardData(copyBoardData);
        setNextNo(nextNo + 1);

        // 목록으로 이동
        navigate('/list');
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="write" /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea type="text" name="contents" cols="22" row="3"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>
}

export default Write