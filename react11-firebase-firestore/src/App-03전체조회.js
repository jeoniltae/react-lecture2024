import React from 'react'
import './App.css';
import { firestore } from './firestoreConfig';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [showData, setShowData] = React.useState([]);

  const getCollection = async () => {
    let trArray = [];
    // 컬렉션 이름으로 지정된 하위 문서를 얻어온다.
    const querySnapshot = await getDocs(collection(firestore, "members"));
    // 문서의 갯수만큼 반복해서 tr태그를 추가한다.
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, doc.data());
      let memberInfo = doc.data();
      trArray.push(
        <tr key={doc.id}>
          <td className='cen'>{doc.id}</td>
          <td className='cen'>{memberInfo.pass}</td>
          <td className='cen'>{memberInfo.name}</td>
          <td className='cen'>{memberInfo.regdate}</td>
        </tr>
      );
    });
    setShowData(trArray);
  }
  return (
    <div className="App">
      <h2>파이어베이스 연동 APP</h2>
      <h3>전체 조회하기</h3>
      <button type='button' onClick={getCollection}>전체조회</button>
      <table className='table table-bordered'>
        <thead>
          <tr className='text-center'>
            <th>아이디</th>
            <th>비밀번호</th>
            <th>이름</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {showData}
        </tbody>
      </table>
    </div>
  );
}

export default App;
