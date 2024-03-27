import React from 'react';

const ArticleEdit = (props) => {
  return (
    <article>
      <form onSubmit={(e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let write = e.target.write.value;
        let contents = e.target.contents.value;

        props.writeAction(title, write, contents);
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
  )
}

export default ArticleEdit;
