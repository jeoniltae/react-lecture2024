import './App.css';

function Header(props) {
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
};

function Nav(props) {
  return (
    <nav>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
};

function Article(props) {
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

  return (
    <div className="App">
      <Header title="게시판 - 목록" />
      <Nav onChangeMode={() => { alert('글쓰기 페이지로 이동'); }} />
      <Article boardData={boardData} onChangeMode={(no) => {
        alert(no);
      }} />
    </div>
  );
}

export default App;
