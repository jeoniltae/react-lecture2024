import './App.css';
import { firestore } from './firestoreConfig';
import { doc, setDoc } from 'firebase/firestore';

function App() {
  console.log('firestore', firestore);

  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    var day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  // Firestore에 내용 입력
  const memberWrite = async (p_collection, p_id, p_pass, p_name) => {
    // 컬렉션은 members로 고정값, id를 document로 사용
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log('입력성공');
  };

  return (
    <div className="App">
      <h2>파이어베이스 연동 APP</h2>
      <h3>입력하기</h3>
      <form onSubmit={e => {
        e.preventDefault();

        // 입력한 폼값을 가져옴
        let collection = e.target.collection.value;
        let id = e.target.id.value;
        let pass = e.target.pass.value;
        let name = e.target.name.value;

        // 입력값이 없을경우 경고창 띄움
        if (id === '') {
          alert('아이디를 입력하세요');
          return;
        }
        if (pass === '') {
          alert('비번을 입력하세요');
          return;
        }
        if (name === '') {
          alert('이름을 입력하세요');
          return;
        }

        // 입력값 인자로 입력함수 호출
        memberWrite(collection, id, pass, name);

        // 재입력을 위해 input 비움
        e.target.id.value = '';
        e.target.pass.value = '';
        e.target.name.value = '';
      }} >
        <table className='table table-bordered table-striped'>
          <tr>
            <td>컬렉션(테이블)</td>
            <td>
              <input type="text" name="collection" value="members" />
            </td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>
              <input type="text" name="id" />
            </td>
          </tr>
          <tr>
            <td>비번</td>
            <td>
              <input type="text" name="pass" />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input type="text" name="name" />
            </td>
          </tr>
        </table>
        <button type='submit'>입력</button>
      </form>
    </div>
  );
}

export default App;
