import { useEffect, useState } from 'react';
import React, { Link, useParams } from 'react-router-dom';

const View = (props) => {
  let params = useParams();
  console.log('idx', params.idx);

  let [boardData, setBoardData] = useState({});
  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
  let parameter = 'tname=nboard_news&idx=' + params.idx;

  useEffect(() => {
    fetch(requestUrl + '?' + parameter).then(res => res.json()).then(json => {
      console.log(json);
      setBoardData(json);
    });

    return () => {
      console.log('컴포넌트 언마운트');
    }
  }, []);
  console.log('boardData', boardData)

  return <>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      <Link to={`/edit/${params.idx}`}>수정</Link>&nbsp;
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
            <td>{boardData.name}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{boardData.subject}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{boardData.regdate}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td dangerouslySetInnerHTML={{ __html: boardData.content }}></td>
          </tr>
        </tbody>
      </table>
    </article>
  </>
}

export default View