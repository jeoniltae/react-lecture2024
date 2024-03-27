import { useState } from 'react';
import './App.css';
import NavList from './components/navigation/NavList';
import ArticleList from './components/article/ArticleList';
import NavView from './components/navigation/NavView';
import ArticleView from './components/article/ArticleView';
import NavWrite from './components/navigation/NavWrite';
import ArticleWrite from './components/article/ArticleWrite';
import NavEdit from './components/navigation/NavEdit';
import ArticleEdit from './components/article/ArticleEdit';

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
  // const boardData = [
  //   {
  //     no: 1,
  //     title: '제목이 들어갑니다..1',
  //     write: '낙짜쌤',
  //     date: '23-01-01',
  //     contents: 'React를 뽀개기',
  //   },
  //   {
  //     no: 2,
  //     title: '제목이 들어갑니다..2',
  //     write: '홍길동',
  //     date: '23-01-02',
  //     contents: 'React를 뽀개기2222',
  //   },
  //   {
  //     no: 3,
  //     title: '제목이 들어갑니다..3',
  //     write: '홍길자',
  //     date: '23-02-01',
  //     contents: 'React를 뽀개기33333',
  //   },
  // ];

  // 글쓰기 처리를 위해 상태관리에 포함
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

  // state: 화면 모드 변경
  const [mode, setMode] = useState('list');
  // state: 읽기 위해 선택한 게시물 번호
  const [no, setNo] = useState(null);
  // state: 게시물의 일련번호(동적 추가)
  const [nextNo, setNextNo] = useState(4);

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
    articleComp = <ArticleWrite writeAction={(t, w, c) => {
      console.log('App.js', t, w, c);

      // 현재 날짜
      let dateObj = new Date();
      var year = dateObj.getFullYear();
      var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
      var day = ('0' + dateObj.getDate()).slice(-2);
      let nowDate = year + '-' + month + '-' + day;

      // 추가할 객체 생성
      let addBoardData = {
        no: nextNo,
        title: t,
        write: w,
        date: nowDate,
        contents: c,
      };

      // 리액트는 state가 변경될 때 원본 배열을 사용하면 화면의 랜더링이 되지 않는다. 따라서 새로운 랜더링을 필요하다면 반드시 배열의 복사본을 만든 후 값을 추가하고 이를 통해 state를 변경해야 한다.
      // 객체 복사 후 useState 설정 변수에 저장
      let copyBoardData = [...boardData];
      copyBoardData.push(addBoardData);
      setBoardData(copyBoardData);

      // 일련번호로 사용하는 state를 1증가 시킨다.
      setNextNo(nextNo + 1);
      // 글쓰기 완료시 화면을 목록 화면으로 전환 시킨다.
      setMode('list');
    }} />
  } else if (mode === 'delete') {
    // 빈 배열 생성
    let newBoardData = [];
    for (let i = 0; i < boardData.length; i++) {
      if (no !== boardData[i].no) {
        newBoardData.push(boardData[i]);
      }
    }
    setBoardData(newBoardData);
    setMode('list');
  } else if (mode === 'edit') {
    titleVar = '게시판 - 수정';

    // 수정의 네비는 2개의 props를 가지고 있다.
    navComp = <NavEdit onChangeMode={() => {
      setMode('list');
    }} onBack={() => {
      setMode('view');
      setNo(no);
    }} />

    for (let i = 0; i < boardData.length; i++) {
      if (no === boardData[i].no) {
        selectRow = boardData[i];
      }
    }

    articleComp = <ArticleEdit selectRow={selectRow} editAction={(t, w, c) => {
      // 사용자가 입력한 값을 통해 새로운 객체를 생성한다. no, date는 기존에 작성한걸 그대로 사용
      let editBoardData = {
        no: no,
        titie: t,
        write: w,
        contents: c,
        date: selectRow.date,
      };
      console.log('수정내용: ', editBoardData);

      let copyBoardData = [...boardData];
      for (let i = 0; i < copyBoardData.length; i++) {
        if (copyBoardData[i].no === no) {
          copyBoardData[i] = editBoardData;
          break;
        }
      }
      setBoardData(copyBoardData);
      setMode('view');
    }} />
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
