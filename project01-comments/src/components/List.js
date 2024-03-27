import React from 'react';

const List = () => {
  return (
    <>
      {/* 
        번호는 1부터 자동부여.
        날짜는 Date객체 사용하여 현재날짜 및 시간 입력
        작성자와 내용은 사용자가 입력.
        수정 버튼 누르면 작성폼에 기존내용 로드
        삭제는 confirm창으로 물어본 후 처리 
      */}
      <table id="boardTable">
        <tbody>
          <tr>
            <td>10</td>
            <td>Writer:낙짜샘</td>
            <td>
              Date:2023-01-01 09:30
              <button type="button">수정</button>
              <button type="button">삭제</button>
            </td>
          </tr>
          <tr>
            <td colSpan="3" className="subject">블라블라 블라블라..</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default List;
