import React, { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';

const List = (props) => {
  return <>
    <header>
      <h2>게시판 - 목록</h2>
    </header>
    <nav>
      <Link to="/write">글쓰기</Link>
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
            <td><Link to="/view">오늘은 리액트 공부하는 날</Link></td>
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
      <Link to="/list">목록</Link>&nbsp;
      <Link to="/edit">수정</Link>&nbsp;
      <Link to="/delete">삭제</Link>
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
      <Link to="/list">목록</Link>
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
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/list' element={<List />} />
          <Route path='/view' element={<View />} />
          <Route path='/write' element={<Write />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
