import React from 'react';

const NavList = (props) => {
  return (
    <nav>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  )
}

export default NavList;
