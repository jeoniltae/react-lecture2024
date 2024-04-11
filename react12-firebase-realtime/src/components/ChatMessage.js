import '../chat.css';
import { child, onValue, push, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { realtime } from '../realtimeConfig';

// 스크롤바를 제일 아래로 내려주는 스크립트
const scrollTop = (chatWindow) => {
  console.log('스크롤TOP 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const ChatMessage = () => {
  // 쿼리스트링으로 전달된 파라미터를 조작할떄 사용하는 라우터 훅
  const [searchParams, setSearchParams] = useSearchParams();
  // 2개의 파라미터를 읽어온다.
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  // 채팅내역이 보여지는 부분의 DOM 참조
  const chatWindow = useRef();

  // 채팅 데이터 저장용 state
  const [chatData, setChatData] = useState('');

  // Realtime에 데이터 입력
  function messageWrite(chatRoom, chatId, chatMessage) {
    // 방이름 하위에 key값으로 대화내역 저장
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage,
    });
    console.log('입력성공')
  };

  // Realtime에
  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapShot) => {
      let showDiv = [];
      snapShot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === userId) {
          // 내가 보낸 메시지(우측 정령)
          showDiv.push(
            <div className='myMsg' style={{ textAlign: 'right' }}>{childData.message}</div>
          );
        } else {
          // 상대방이 보낸 메세지(좌측 정렬)
          showDiv.push(
            <div>{childData.message}</div>
          );
        }

        // 스크롤바를 제일 아래쪽으로 내려줌
        setTimeout(() => {
          scrollTop(chatWindow.current);
        }, 0);
      });
      // state를 변경해서 대화내역을 새롭게 렌더링 한다.
      setChatData(showDiv);
    });
  }, []);

  return (
    <div className='App'>
      <h2>Realtime 채팅</h2>
      대화명: {userId} &nbsp;&nbsp;
      <button id="closeBtn" onClick={() => {
        window.self.close();
      }}>채팅 종료</button>
      <div id="chatWindow" ref={chatWindow}>{chatData}</div>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          let chatRoom = e.target.chatRoom.value;
          let chatId = e.target.chatId.value;
          if (chatId === '') {
            alert('대화명을 입력해주세요');
            return;
          }
          let message = e.target.message.value;
          if (message === '') {
            alert('메세지를 입력해주세요');
            return;
          }
          console.log('submit', chatRoom, chatId, message);
          messageWrite(chatRoom, chatId, message);
          e.target.message.value = '';
        }}>
          <input type="hidden" name='chatRoom' value={roomId} />
          <input type="hidden" name='chatId' value={userId} />
          <input type="text" name='message' />
          <button type='submit'>전송</button>
        </form>
      </div>
    </div>
  )
}

export default ChatMessage