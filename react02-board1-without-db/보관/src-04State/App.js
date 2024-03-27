import { useState } from 'react';
import './App.css';

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

// 목록 네비게이션
function NavList(props) {
  return (
    <nav>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
};

// 내용보기의 네비게이션
function NavView(props) {
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
  );
};

// 작성하기 네비게이션
function NavWrite(props) {
  return (
    <nav>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  );
};

// 게시판 목록
function ArticleList(props) {
  const lists = [];
  for (let i = 0; i < props.boardData.length; i++) {
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="can">{row.no}</td>
        <td>
          <a href={`/read/${row.no}`} onClick={(e) => {
            e.preventDefault();
            props.onChangeMode(row.no);
          }}>{row.title}</a>
        </td>
        <td className="can">{row.write}</td>
        <td className="can">{row.date}</td>
      </tr>
    );
  }

  return (
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
          {lists}
        </tbody>
      </table>
    </article>
  );
};

// 게시판 읽기
function ArticleView(props) {
  return (
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 리액트 공부하는 날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2030-05-05</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>열심히 해보자<br />열공 합시당</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

// 게시판 작성
function ArticleWrite(props) {
  return (
    <article>
      <form>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea type="text" name="contents" cols="22" row="3"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
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
  let articleComp, navComp, titleVar;

  if (mode === 'list') {
    titleVar = '게시판 - 목록';
    navComp = <NavList onChangeMode={() => {
      setMode('write');
    }} />
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no) => {
      console.log(`선택한 게시물 번호: ${no}`);
      setMode('view');
    }} />
  } else if (mode === 'view') {
    titleVar = '게시판 - 읽기';
    navComp = <NavView onChangeMode={(pmode) => {
      setMode(pmode);
    }} />
    articleComp = <ArticleView />
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
