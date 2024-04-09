import React, { useEffect, useState } from 'react'
import './App.css';
import { firestore } from './firestoreConfig';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

function App() {
  const [showData, setShowData] = React.useState([]);
  const [renderFlag, setRenderFlag] = React.useState(true);

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
  }, [renderFlag]);

  // input에 설정된 값은 state를 통해 변경해야 하므로 개수만큼 선언
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>파이어베이스 연동 APP</h2>
      <h3>개별 조회 및 삭제하기</h3>
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
      <form onSubmit={async (e) => {
        e.preventDefault();
        let id = e.target.id.value;
        console.log('삭제', id);

        if (id === '') {
          alert('사용자를 먼저 선택해주세요');
          return;
        }

        // 선택한 아이디를 폼에 채운 후 submit하면 deleteDoc통해 문서 삭제
        await deleteDoc(doc(firestore, 'members', e.target.id.value));

        // setRenderFlag(!renderFlag);

        // 입력폼을 비워준다.
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
              <input type="text" name='id' value={id} />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="password" name='pass' value={pass} />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input type="text" name='name' value={name} />
            </td>
          </tr>
        </table>
        <button type='submit'>삭제</button>
      </form>
    </div>
  );
}

export default App;
