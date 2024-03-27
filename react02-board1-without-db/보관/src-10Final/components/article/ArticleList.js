import React from 'react';

const ArticleList = (props) => {
  const lists = [];
  for (let i = 0; i < props.boardData.length; i++) {
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="can">{row.no}</td>
        <td>
          <a href={`/read/${row.no}`} onClick={(e) => {
            e.preventDefault();
            props.onChangeMode(row.no);
          }}>{row.title}</a>
        </td>
        <td className="can">{row.write}</td>
        <td className="can">{row.date}</td>
      </tr>
    );
  }

  return (
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
  );
}

export default ArticleList;
