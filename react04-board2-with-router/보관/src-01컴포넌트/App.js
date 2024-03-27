import './App.css';

const List = (props) => {
  return <>
    <header>
      <h2>게시판 - 목록</h2>
    </header>
    <nav>
      <a href="/write">글쓰기</a>
    </nav>
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
            <td><a href="/view/1">오늘은 리액트 공부하는 날</a></td>
            <td class="cen">홍길동</td>
            <td class="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>
};

const View = (props) => {
  return <>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>
    <nav>
      <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a>
    </nav>
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
  </>
};

const Write = (props) => {
  return <>
    <header>
      <h2>게시판 - 작성</h2>
    </header>
    <nav>
      <a href="/list">목록</a>
    </nav>
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
  </>
}

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을수 없음.
      </p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <List />
      <View />
      <Write />
      <NotFound />
    </div>
  );
}

export default App;
