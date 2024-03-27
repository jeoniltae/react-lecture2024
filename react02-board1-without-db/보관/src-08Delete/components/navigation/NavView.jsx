import React from 'react';

const NavView = (props) => {
  return (
    <nav>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>&nbsp;
      <a href="/" onClick={(e) => {
        e.preventDefault();
        // JSX문법에서는 반드시 window객체를 추가해야 함.
        if (window.confirm('삭제할까요?')) {
          props.onChangeMode('delete');
        }
      }}>삭제</a>
    </nav>
  )
}

export default NavView;
