import React, { useEffect, useState } from 'react';

const MyCommunication = (props) => {
  // 외부 서버의 API를 얻어오기 위해 state생성. 초기값은 JSON의 포맷에 따라 달라질 수 있으므로 확인 후 설정하도록 한다.
  const [myJSON, setMySJSON] = useState({ results: [] });

  useEffect(() => {
    fetch('https://api.randomuser.me/?results=10').then(result => {
      return result.json();
    }).then(json => {
      console.log(json);
      setMySJSON(json);
    });
    return () => {
      console.log('컴포넌트 언마운트')
    };
  }, []);

  // 콜백 받은 JSON데이터를 파싱하여 <tr>태그로 구성한다.
  let trTag = [];
  for (let i = 0; i < myJSON.results.length; i++) {
    let data = myJSON.results[i];
    trTag.push(
      <tr key={data.login.md5}>
        <td><img src={data.picture.thumbnail} alt={data.login.username} /></td>
        <td>
          <a href="/" onClick={e => {
            e.preventDefault();
            // 아이디를 클릭하면 props로 전달된 함수를 호출한다. 현재 루프의 객체를 그대로 인자로 전달한다.
            props.onProfile(data);
          }}>
            {data.login.username}
          </a>
        </td>
        <td>{data.name.title} {data.name.first} {data.name.last}</td>
        <td>{data.nat}</td>
        <td>{data.email}</td>
      </tr>
    );
  }

  return (
    <div>
      <table border='1'>
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>나라</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {trTag}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h2>React - 외부서버통신</h2>
      <MyCommunication onProfile={sData => {
        console.log(sData);
        let info = `
          전화번호: ${sData.cell} 
          성별: ${sData.gender}
          username: ${sData.login.username}
          password: ${sData.login.password}`;
        alert(info);
      }} />
    </div>
  );
}

export default App;
