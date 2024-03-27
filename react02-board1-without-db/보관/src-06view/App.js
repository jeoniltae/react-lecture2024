import { useState } from 'react';
import './App.css';
import NavList from './components/navigation/NavList';
import ArticleList from './components/article/ArticleList';
import NavView from './components/navigation/NavView';
import ArticleView from './components/article/ArticleView';
import NavWrite from './components/navigation/NavWrite';
import ArticleWrite from './components/article/ArticleWrite';

function ReadComp(props) {
  return (
    <div>
      <h3>준비중</h3>
      <a href="/">HOME으로 바로가기</a>
    </div>
  );
};

function Header(props) {
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
};

function App() {
  const boardData = [
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
  ];

  const [mode, setMode] = useState('list');
  const [no, setNo] = useState(null);

  let articleComp, navComp, titleVar, selectRow;

  if (mode === 'list') {
    titleVar = '게시판 - 목록';
    navComp = <NavList onChangeMode={() => {
      setMode('write');
    }} />
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no) => {
      console.log(`선택한 게시물 번호: ${no}`);
      setMode('view');
      setNo(no);
    }} />
  } else if (mode === 'view') {
    titleVar = '게시판 - 읽기';
    navComp = <NavView onChangeMode={(pmode) => {
      setMode(pmode);
    }} />

    console.log(`현재no: ${no}, ${typeof (no)}`)
    // 선택한 게시물 번호와 일치하는 객체를 검색
    for (let i = 0; i < boardData.length; i++) {
      if (no === boardData[i].no) {
        selectRow = boardData[i];
      }
    }
    articleComp = <ArticleView selectRow={selectRow} />
  } else if (mode === 'write') {
    titleVar = '게시판 - 쓰기';
    navComp = <NavWrite onChangeMode={() => {
      setMode('list');
    }} />
    articleComp = <ArticleWrite />
  } else {
    navComp = <ReadComp />;
    articleComp = '';
  }

  return (
    <div className="App">
      <Header title={titleVar} />
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;
