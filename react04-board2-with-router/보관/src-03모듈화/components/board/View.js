import React, { Link } from 'react-router-dom';

const View = () => {
  return <>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      <Link to="/edit">수정</Link>&nbsp;
      <Link to="/delete">삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 리액트 공부하는 날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2030-05-05</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>열심히 해보자<br />열공 합시당</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>
}

export default View