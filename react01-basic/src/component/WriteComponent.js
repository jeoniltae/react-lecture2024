import React from 'react';

const WriteComponent = (props) => {
  return (
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        <a href="/" onClick={(e) => {
          e.preventDefault();
          props.changeMode('list');
        }}>목록</a>
      </nav>
      <article>
        <form>
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
      </article>
    </>
  )
}

export default WriteComponent;