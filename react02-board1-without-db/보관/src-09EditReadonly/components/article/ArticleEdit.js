import React from 'react';

// 수정페이지를 구성하기 위해 기존의 데이터를 props로 전달받아 input태그의 value속성값으로 설정.
// 하지만 이 경우 input이 readonly속성으로 랜더링 되어 기존의 내용을 수정할 수 없게 된다.
// 리액트에서는 props는 외부에서 내부로 전달되는 일종의 파라미터이므로 애초에 '읽기 전용'으로 설정되어 있다.
const ArticleEdit = (props) => {
  return (
    <article>
      <form onSubmit={(e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let write = e.target.write.value;
        let contents = e.target.contents.value;

        props.editAction(title, write, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="write" value={props.selectRow.write} /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={props.selectRow.title} /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                {/* HTML에서는 textarea태그에 value속성을 사용하지 않지만 JSX에서는 input과 동일하게 이 속성을 사용해서 기존값을 사용한다. */}
                <textarea type="text" name="contents" cols="22" row="3" value={props.selectRow.contents} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기" />
      </form>
    </article>
  )
}

export default ArticleEdit;
