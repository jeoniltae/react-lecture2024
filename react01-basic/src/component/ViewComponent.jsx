import React from 'react';

const ViewComponent = (props) => {
  return (
    <>
      <header>
        <h2>게시판 - 읽기</h2>
      </header>
      <nav>
        <a href="/" onClick={(e) => {
          e.preventDefault();
          props.changeMode('list');
        }}>목록</a>&nbsp;
        <a href="/" onClick={(e) => {
          e.preventDefault();
          alert('수정');
        }}>수정</a>&nbsp;
        <a href="/" onClick={(e) => {
          e.preventDefault();
          alert('삭제');
        }}>삭제</a>
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
  )
}

export default ViewComponent;