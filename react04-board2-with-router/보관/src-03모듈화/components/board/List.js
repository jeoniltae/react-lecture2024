import React, { Link } from 'react-router-dom';

const List = () => {
  return <>
    <header>
      <h2>게시판 - 목록</h2>
    </header>
    <nav>
      <Link to="/write">글쓰기</Link>
    </nav>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="cen">1</td>
            <td><Link to="/view">오늘은 리액트 공부하는 날</Link></td>
            <td className="cen">홍길동</td>
            <td className="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>
}

export default List