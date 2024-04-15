import './App.css';
import { storage } from './storageConfig';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  // 파이어베이스 스토리지 연결 및 확인
  const storageRef = ref(storage);
  console.log('storageRef', storageRef);

  // ref()를 호출할 때 두번째 인수를 통해 참조를 만들 수 있다.
  const imagesRef1 = ref(storage, 'images');
  const imagesRef2 = ref(storage, 'images/myfile.jpg');

  // parent는 한단계 상위, root는 위치에 상관없이 최상위로 이동할 수 있다.
  const imagesRef3 = imagesRef2.parent;
  const imagesRef4 = imagesRef2.root;

  console.log('ref객체', imagesRef1); // 객체를 통해 모든 프로퍼티 확인 가능
  console.log('경로1', imagesRef1.fullPath); // 전체경로
  console.log('경로2', imagesRef2.fullPath, imagesRef2.name); // 파일명
  console.log('경로3', imagesRef3.fullPath); // imagesRef1와 동일
  console.log('경로4', imagesRef4.fullPath); // 최상위 이므로 빈 값 출력
  return (
    <div className="App">
      <h2>Firebase - Storage App</h2>
      <h3>스토리지 접속 및 파일 업로드</h3>
      <p>파일을 선택하면 즉시 업로드 됩니다.</p>
      <input type="file" name="myfile" onChange={e => {
        // 선택한 파일을 배열형태로 출력한다. 파일 하나를 선택했다면 0번 인덱스를 사용한다.
        console.log('file 프로퍼티:', e.target.files);

        // const ref참조변수 = ref(스토리지접속, 파일명지정);
        const imageRef = ref(storage, e.target.files[0].name);
        // uploadBytes(ref참조변수, 파일객체).then(콜백함수);
        uploadBytes(imageRef, e.target.files[0]).then(snapshot => {
          console.log('업로드 성공', snapshot)
        });
      }} />
    </div>
  );
}

export default App;
