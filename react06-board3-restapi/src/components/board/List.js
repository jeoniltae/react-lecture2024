import { useEffect, useState } from 'react';
import React, { Link } from 'react-router-dom';

const List = (props) => {
  // API서버와의 통신을 통해 전달받은 JSON데이터 저장. 초기값은 빈 배열.
  let [boardData, setBoardData] = useState([]);

  useEffect(() => {
    fetch('http://nakja.co.kr/APIs/php7/boardListJSON.php?tname=nboard_news').then(res => res.json()).then(json => {
      console.log(json);
      setBoardData(json);
    });

    return () => {
      console.log('컴포넌트 언마운트');
    };
  }, []);

  let lists = [];

  // for ~ of문을 통해 JSON배열의 크기만큼 반복
  for (let row of boardData) {
    console.log(row);
    // 날짜와 제목은 UI에 맞춰주기 위해서 짤라줌.
    let date = row.regdate.substring(0, 10);
    let subject = row.subject.substring(0, 20);
    lists.push(
      <tr key={row.index}>
        <td className="cen">{row.idx}</td>
        <td><Link to={`/view/${row.idx}`}>{subject}</Link></td>
        <td className="cen">{row.name}</td>
        <td className="cen">{date}</td>
      </tr>
    );
  }

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
          {lists}
        </tbody>
      </table>
    </article>
  </>
}

export default List