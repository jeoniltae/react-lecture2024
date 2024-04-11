import React, { useState } from 'react'
import { realtime } from '../realtimeConfig';
import { child, get, getDatabase, push, ref, remove, set, update } from 'firebase/database';
import Navi from './Navi';

const RealtimeCRUD = () => {
  // database 연결 확인
  console.log('realtime', realtime);

  // 데이터 쓰기
  function writeUserData(userId, userName, userPass) {
    // Realtime에서 제공하는 등록을 위한 새로운 key생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    // 최상위 노드를 users로 하고 하위는 사용자id로 데이터 구분
    // 아이디가 동일하면 덮어쓰기, 다르면 새로운 게시물로 등록
    set(ref(realtime, 'users/' + userId), {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    });
    console.log('입력성공');
  };

  // 데이터 읽기
  function readUserData(userId) {
    const dbRef = ref(getDatabase());
    // 노드에 등록된 아이디가 있는지 확인한 후 데이터 가져옴
    get(child(dbRef, `users/${userId}`)).then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('no data!')
      }
    }).catch(err => {
      console.log(err);
    });
  };

  // 데이터 수정
  function editUserData(userId, userName, userPass) {
    // 고유키 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    // 수정할 데이터를 객체형식으로 작성
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    };

    // 아이디로 지정된 데이터를 찾아서 수정
    const updates = {};
    updates['/users/' + userId] = postData;
    return update(ref(realtime), updates);
  };

  // 데이터 삭제 케이스1
  function deleteUserData1(userId) {
    // 기존 데이터를 null값으로 대체해서 삭제
    const delets = {};
    delets['/users/' + userId] = null;
    return update(ref(realtime), delets);
  };

  // 데이터 삭제 케이스2
  function deleteUserData2(userId) {
    // remove함수를 통해서 데이터 삭제
    remove(ref(realtime, '/users/' + userId)).then(() => {
      console.log('삭제완료');
    }).catch(err => {
      console.log('삭제실패', err);
    });
  }

  const [addNum, setAddNum] = useState(0);

  // 입력데이터(수정해서 사용해야 함)
  let adder = '-' + addNum;
  const id = 'nakja' + adder;
  const name = '낙자쌤' + adder;
  const pass = 'xyz' + adder;

  return (
    <div className='App'>
      <Navi />
      <h2>파이어베이스 - 리얼타임 베이스 앱</h2>
      <h3>01. CRUD</h3>
      <input type='number' value={addNum} onChange={(e) => {
        setAddNum(e.target.value);
      }} />
      <input type="button" value="입력" onClick={() => {
        writeUserData(id, name, pass);
      }} />
      <input type="button" value="읽기" onClick={() => {
        readUserData(id);
      }} />
      <input type="button" value="수정" onClick={() => {
        editUserData(id, name + 'edit', pass + 'edit');
      }} />
      <input type="button" value="삭제1" onClick={() => {
        deleteUserData1(id);
      }} />
      <input type="button" value="삭제2" onClick={() => {
        deleteUserData2(id);
      }} />
    </div>
  )
}

export default RealtimeCRUD