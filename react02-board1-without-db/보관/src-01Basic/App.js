import './App.css';

function Header(props) {
  return (
    <header>
      <h2>게시판 - 목록</h2>
    </header>
  );
};

function Nav(props) {
  return (
    <nav>
      <a href="/">글쓰기</a>
    </nav>
  );
};

function Article(props) {
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
          <tr>
            <td class="cen">1</td>
            <td>오늘은 리액트 공부하는 날</td>
            <td class="cen">홍길동</td>
            <td class="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Article />
    </div>
  );
}

export default App;
