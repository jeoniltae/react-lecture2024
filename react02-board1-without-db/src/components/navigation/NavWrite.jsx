import React from 'react';

const NavWrite = (props) => {
  return (
    <nav>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  )
}

export default NavWrite;
