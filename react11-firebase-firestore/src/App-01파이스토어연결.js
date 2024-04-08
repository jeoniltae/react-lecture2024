import './App.css';
import { firestore } from './firestoreConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  console.log('firestore', firestore)

  // 토큐먼트 추가
  const addMessage = async () => {
    // 컬렉션(테이블과 비슷): Korea
    // 도큐먼트(레코드와 비슷): Seoul
    // 하위 데이터는 JSON객체 형식으로 제작하면 된다.
    await setDoc(doc(firestore, 'Korea', 'Seoul4'), {
      gu: '종로구4',
      dong: '관철동4',
      hotplace: '더조은IT4',
    });
    console.log('입력성공');
  };

  // 도큐먼트 읽기
  const getMessage = async () => {
    // 입력된 컬렉션과 도큐먼트를 통해 문서의 참조를 가져온다.
    const docRef = doc(firestore, 'Korea', 'Seoul4');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // 해당 도큐먼트가 존재하면 콘솔에 출력
      console.log('doc data:', docSnap.data());
    } else {
      console.log('no such doc!')
    }
  };
  return (
    <div className="App">
      <h2>파이어베이스 연동 APP</h2>
      <h3>파이어베이스 연결</h3>
      <input type="button" value="입력" onClick={addMessage} />
      <input type="button" value="읽기" onClick={getMessage} />
    </div>
  );
}

export default App;
