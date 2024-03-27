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
        props.onChangeMode('delete');
      }}>삭제</a>
    </nav>
  )
}

export default NavView;
