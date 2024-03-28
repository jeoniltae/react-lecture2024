import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ contacts: [] });
  const [view, setView] = useState({});

  useEffect(() => {
    fetch('https://sample.bmaster.kro.kr/contacts?pageno=5').then(res => {
      // fetch('./api.json').then(res => {
      return res.json();
    }).then(json => {
      setData(json);
    });
  }, []);
  // console.log(data);

  return (
    <div className="App">
      <h1>API 연락처 연동하기</h1>
      <div className="container">
        <div className='list'>
          <table>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>이름</th>
              </tr>
            </thead>
            <thead>
              {
                data.contacts.map((item) => {
                  return (
                    <tr key={item.no}>
                      <td><img src={item.photo} alt={item.name} /></td>
                      <td><button type='button' onClick={() => {
                        setView(item);
                      }}>{item.name}</button></td>
                    </tr>
                  );
                })
              }
            </thead>
          </table>
        </div>
        <div className='view'>
          <ul>
            <li>no: {view.no}</li>
            <li>name: {view.name}</li>
            <li>tel: {view.tel}</li>
            <li>address: {view.address}</li>
            <li>photo: <img src={view.photo} alt="" /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
