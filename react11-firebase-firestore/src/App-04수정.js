import React, { useEffect, useState } from 'react'
import './App.css';
import { firestore } from './firestoreConfig';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

function App() {
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    var day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  // 문서 수정을 위한 함수
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    // doc(db, 컬렉션, 아이디), {수정할 내용} 이와 같이 수정한다.
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log('수정성공');
  };

  // select태그의 내용을 추가하기 위한 state
  const [showData, setShowData] = React.useState([]);

  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];
      // members컬렉션의 내용을 가져온다.
      const querySnapshot = await getDocs(collection(firestore, "members"));
      // 문서의 갯수만큼 반복해서 tr태그를 추가한다.
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, doc.data());
        let memberInfo = doc.data();
        // value는 아이디, text는 이름으로 설정
        trArray.push(
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }
    // 함수 호출 후 콜백된 데이터를 then절에서 처리
    getCollection().then(result => {
      console.log('result', result);
      setShowData(result);
    })
  }, []);

  // input에 설정된 값은 state를 통해 변경해야 하므로 개수만큼 선언
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>파이어베이스 연동 APP</h2>
      <h3>개별 조회 및 수정하기</h3>
      {/* 항목 하나를 선택하면 change이벤트가 발생된다. */}
      <select onChange={
        async (e) => {
          // 선택 항목의 value 즉 아이디를 얻어온다.
          let user_id = e.target.value;
          console.log('선택', user_id);

          // 컬렌션명과 아이디(문서명)를 통해 Doc 얻어온다.
          const docRef = doc(firestore, "members", user_id);
          const doSnap = await getDoc(docRef);
          if (doSnap.exists()) {
            // 해당 문서가 존재하면 데이터를 인출한 후..
            console.log('doc data: ', doSnap.data());
            let callData = doSnap.data();
            // 각 state를 변경하여 input에 추가한다.
            setId(user_id);
            setPass(callData.pass);
            setName(callData.name);
          } else {
            console.log('no such doc!');
          }
        }
      }>
        <option value=''>선택하세요</option>
        {showData}
      </select>
      <form onSubmit={(e) => {
        e.preventDefault();

        // submit이벤트 발생시 폼값을 얻어온다.
        let collection = e.target.collection.value;
        let id = e.target.id.value;
        let pass = e.target.pass.value;
        let name = e.target.name.value;

        if (id === '') {
          alert('사용자를 먼저 선택해주세요');
          return;
        }

        // 수정을 위한 함수 호출
        memberEdit(collection, id, pass, name);

        e.target.id.value = '';
        e.target.pass.value = '';
        e.target.name.value = '';
      }}>
        <table className='table table-bordered table-striped'>
          <tr>
            <td>컬렉션(테이블)</td>
            <td>
              <input type="text" name='collection' value="members" />
            </td>
          </tr>
          <tr>
            <td>아이디(변경불가)</td>
            <td>
              <input type="text" name='id' value={id} readOnly onChange={e => {
                setId(e.target.value);
              }} />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="password" name='pass' value={pass} onChange={e => {
                setPass(e.target.value);
              }} />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input type="text" name='name' value={name} onChange={e => {
                setName(e.target.value);
              }} />
            </td>
          </tr>
        </table>
        <button type='submit'>수정</button>
      </form>
    </div>
  );
}

export default App;
