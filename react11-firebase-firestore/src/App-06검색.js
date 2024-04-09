import React from 'react';
import './App.css';
import { firestore } from './firestoreConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

function App() {
  const [showData, setShowData] = React.useState([]);

  // 검색을 위한 함수. 검색 필드와 검색어를 매개변수로 정의
  const getCollection = async (sField, sStr) => {
    console.log('선택', sField);
    let row = {};
    // let user_id = '';
    if (sField === 'id') {
      // user_id = sStr;
      // id를 document로 사용하고 있으므로 아래와 같이 검색한다.
      const docRef = doc(firestore, 'members', sStr);
      // 문서의 참조값을 찾은 후 문서를 얻어온다.
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Doc Data: ', docSnap.data());
        // 문서의 데이터를 변수에 저장한다.
        row = docSnap.data();
      } else {
        console.log('no such doc!');
      }
    } else if (sField === 'name') {
      // 먼저 컬렉션을 얻어온다.
      const membersRef = collection(firestore, 'members');
      // console.log('membersRef', membersRef, membersRef._path.segements[0]);
      // query함수를 통해 where(조건)에 맞는 데이터를 찾는다.
      const q = query(membersRef, where('name', '==', sStr));
      // 조건에 맞는 문서를 가져온다.
      const querySnapshot = await getDocs(q);
      // 조건에 일치하는 문서는 2개 이상일 수 있으므로 반복한다.
      querySnapshot.forEach(doc => {
        console.log(doc.id, doc.data());
        row = doc.data();
      });
    }

    let trArray = [];
    trArray.push(
      <tr key={row.id}>
        <td className='cen'>{row.id}</td>
        <td className='cen'>{row.pass}</td>
        <td className='cen'>{row.name}</td>
        <td className='cen'>{row.regdate}</td>
      </tr>
    );
    setShowData(trArray);
  };

  return (
    <div className="App">
      <h2>파이어베이스 연동 APP</h2>
      <h3>검색하기</h3>
      <form onSubmit={e => {
        e.preventDefault();
        let sf = e.target.searchField.value;
        let ss = e.target.searchStr.value;
        getCollection(sf, ss);
      }}>
        <select name="searchField">
          <option value="id">아이디</option>
          <option value="name">이름</option>
        </select>
        <input type="text" name='searchStr' style={{ width: '150px' }} />
        <button type='submit'>전체조회</button>
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
      </form>
    </div>
  );
}

export default App;
