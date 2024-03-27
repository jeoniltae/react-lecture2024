import React from 'react';

const View = () => {
  return (
    <>
      <table id="boardTable">
        <colgroup>
          <col width="100" />
          <col width="150" />
          <col width="100" />
          <col width="150" />
        </colgroup>
        <tbody>
          <tr>
            <th>번호</th>
            <td>100</td>
            <th>작성자</th>
            <td>낙짜쌤</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colSpan="3" className="subject">댓글 구현을 위한 스킨</td>
          </tr>
          <tr>
            <th>내용</th>
            <td colSpan="3" className="subject">
              읽기 부분은 구현하지 않습니다. <br />
              아래 댓글 부분을 구현하면 됩니다.
            </td>
          </tr>
          <tr>
            <td colSpan="4" align="center">
              <button type="button">목록가기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default View;
