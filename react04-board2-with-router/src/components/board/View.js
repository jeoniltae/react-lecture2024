import { useEffect, useState } from 'react';
import React, { Link, useNavigate, useParams } from 'react-router-dom';

const View = (props) => {
  const nextNo = props.nextNo;
  const navigate = useNavigate();
  const paramNum = useParams();
  const { no } = paramNum;

  var params = useParams();
  // console.log('파라미터', params.no);

  // reduce() 함수는 배열의 크기만큼 반복하여 조건에 맞는 하나의 값을 반환함.
  let vi = props.boardData.reduce((prev, curr) => {
    // 조회할 게시물의 일련번호와 일치하는 개체를 찾아 prev에 저장한 후 반환함.
    if (curr.no === Number(params.no)) {
      prev = curr;
    }
    return prev;
  }, {});

  // 
  let readNum = Number(params.no);
  let prevNum = 0, nextNum = 0;

  if (readNum - 1 === 0) {
    prevNum = 1;
  } else {
    prevNum = Number(params.no) - 1;
  }

  nextNum = readNum + 1;

  let isNextNum = props.boardData.reduce((prev, curr) => {
    // 조회할 게시물의 일련번호와 일치하는 개체를 찾아 prev에 저장한 후 반환함.
    if (curr.no === nextNum) {
      prev = true;
    }
    return prev;
  }, false);

  if (isNextNum === false) {
    nextNum = readNum;
  }

  // 
  const goPrev = () => {
    if (readNum - 1 === 0) {
      prevNum = 1;
      alert('이전 페이지가 없습니다.');
    } else {
      prevNum = Number(params.no) - 1;
    }
    navigate(`/view/${prevNum}`);
  };

  const goNext = () => {
    nextNum = readNum + 1;

    let isNextNum = props.boardData.reduce((prev, curr) => {
      // 조회할 게시물의 일련번호와 일치하는 개체를 찾아 prev에 저장한 후 반환함.
      if (curr.no === nextNum) {
        prev = true;
      }
      return prev;
    }, false);
    if (isNextNum === false) {
      nextNum = readNum;
      alert('다음 페이지가 없습니다.');
    }
    navigate(`/view/${nextNum}`);

  };

  // 
  const handlePrev = () => {
    const prev = parseInt(no) - 1;
    navigate(`/view/${prev}`);
    if (prev === 0) {
      navigate('/view/1');
      alert('첫번째 페이지 입니다.');
    }
  };

  const handleNext = () => {
    const next = parseInt(no) + 1;
    navigate(`/view/${next}`);
    if (nextNo <= next) {
      navigate(`/view/${nextNo - 1}`);
      alert('마지막 페이지 입니다.');
    }
  };
  return <>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      <Link to="/edit">수정</Link>&nbsp;
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
            <td>{vi.write}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{vi.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{vi.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{vi.contents}</td>
          </tr>
        </tbody>
      </table>
    </article>
    {/* <button type='button' onClick={handlePrev}>이전</button>
    <button type='button' onClick={handleNext}>다음</button> */}
    {/* <Link to={`/view/${prevNum}`}>이전글</Link>
    <Link to={`/view/${nextNum}`}>다음글</Link> */}
    <a href='/' onClick={(e) => {
      e.preventDefault();
      goPrev();
    }}>이전</a>
    <a href='/' onClick={(e) => {
      e.preventDefault();
      goNext();
    }}>다음</a>
  </>
}

export default View