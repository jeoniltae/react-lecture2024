import React, { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import List from './components/board/List';
import View from './components/board/View';
import Write from './components/board/Write';
import NotFound from './components/common/NotFound';
import Edit from './components/board/Edit';
import { useState } from 'react';

function App() {
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    var day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  // 기존에 데이터를 state로 변경
  const [boardData, setBoardData] = useState([
    {
      no: 1,
      title: '제목이 들어갑니다..1',
      write: '낙짜쌤',
      date: '23-01-01',
      contents: 'React를 뽀개기',
    },
    {
      no: 2,
      title: '제목이 들어갑니다..2',
      write: '홍길동',
      date: '23-01-02',
      contents: 'React를 뽀개기2222',
    },
    {
      no: 3,
      title: '제목이 들어갑니다..3',
      write: '홍길자',
      date: '23-02-01',
      contents: 'React를 뽀개기33333',
    },
  ]);
  const [nextNo, setNextNo] = useState(4);
  const navigate = useNavigate();

  return (
    // <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<List boardData={boardData} />} />
        <Route path='/list' element={<List boardData={boardData} />} />
        {/* 상세보기의 경우 조회할 게시물의 일련번호가 필요하므로, 중첩된 라우터 구조로 정의한다. :no는 라우터 돔에서 제공하는 훅을 통해 값을 얻어올 수 있다. */}
        <Route path='/view'>
          <Route path=':no' element={<View boardData={boardData} nextNo={nextNo} setNextNo={setNextNo} />} />
        </Route>
        {/* Write컴포넌트 내에서 글쓰기 처리를 할 수 있도록 App에서 생성한 모든 state와 관련함수를 Props로 전달한다. */}
        <Route path='/write' element={<Write boardData={boardData} setBoardData={setBoardData} nextNo={nextNo} setNextNo={setNextNo} navigate={navigate} nowDate={nowDate} />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
    // </BrowserRouter>
  );
}

export default App;
