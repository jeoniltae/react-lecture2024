import React from 'react';
import { Link } from 'react-router-dom';

const Navi = () => {
  return (
    <>
      <div className='naviWap'>
        <Link to="/crud">RealtimeCRUD</Link>&nbsp;&nbsp;
        <Link to="/Listener">RealtimeListener</Link>&nbsp;&nbsp;
        <Link to="/chat">RealtimeChat</Link>&nbsp;&nbsp;
      </div>
    </>
  )
};

export default Navi;
