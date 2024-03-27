// 컴포넌트 모듈화를 위해 제일 먼저 필요한 리액트 임포트 선언
import React from 'react';

// 함수형 컴포넌트 생성, 일반적인 JS함수로 정의.
const ListComponent = (props) => {
  // 컴포넌트에서 실제 표현해야하는 화면을 return문 내부에 기술.
  // 함수형에서는 return문으로 사용
  return (
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        <a href="/" onClick={(e) => {
          e.preventDefault();
          props.changeMode('write');
        }}>글쓰기</a>
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
              <td class="cen">1</td>
              <td>
                {/* 부모에서 전달된 props를 아래와 같이 호출해서 mode를 view로 변경 */}
                <a href="/" onClick={(e) => {
                  e.preventDefault();
                  props.changeMode('view');
                }}>오늘은 리액트 공부하는 날</a></td>
              <td class="cen">홍길동</td>
              <td class="cen">2030-05-05</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}

export default ListComponent;