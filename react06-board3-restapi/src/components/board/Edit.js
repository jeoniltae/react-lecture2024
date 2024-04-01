import { useEffect, useState } from 'react';
import React, { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = (props) => {
  const navigate = useNavigate();
  let params = useParams();
  console.log('수정idx', params.idx);

  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
  let parameter = 'tname=nboard_news&idx=' + params.idx;

  // 수정을 위한 State
  // React에서는 input에 value속성으로 값을 설정하는 경우 내용 수정이 불가능하다. 따라서 state를 통해 값을 수정할 수 있도록 해야한다.
  // API값을 통해 읽어온 값을 state에 저장하고 onChange이벤트 리스터를 통해 설정된 값을 수정한다.
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    fetch(requestUrl + '?' + parameter)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });

    return () => {
      console.log('컴포넌트 언마운트');
    }
  }, []);

  return <>
    <header>
      <h2>게시판 - 수정</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      <form onSubmit={(e) => {
        e.preventDefault();

        // target속성을 통해 입력한 form값을 얻어옴.
        let i = e.target.idx.value;
        let w = e.target.writer.value;
        let t = e.target.title.value;
        let c = e.target.contents.value;
        console.log(w, t, c);

        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
          // 전송 방식
          method: 'POST',
          // enctype(전송시 인코딩 방식)과 케릭셋을 지정
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          // 작성자가 입력한 폼값을 JSON형식으로 조립하여 전송
          // URLSearchParams() 객체는 JSON형식의 데이터를 쿼리스트링 형식으로 변경해주는 역할을 한다.
          body: new URLSearchParams({
            tname: 'nboard_news',
            id: 'jsonAPI',
            name: w,
            subject: t,
            content: c,
            idx: i,
          }),
        })
          .then(res => res.json())
          .then(json => console.log(json));

        navigate('/list');
      }}>
        <input type='hidden' name="idx" value={params.idx} />
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={writer} onChange={e => {
                setWriter(e.target.value);
              }} /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={title} onChange={e => {
                setTitle(e.target.value);
              }} /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea type="text" name="contents" cols="22" row="3" value={contents} onChange={e => {
                  setContents(e.target.value);
                }} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>
}

export default Edit