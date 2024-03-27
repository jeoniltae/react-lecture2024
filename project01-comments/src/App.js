import { useState } from 'react';
import './App.css';
import List from './components/List';
import View from './components/View';
import Write from './components/Write';

const nowDateStr = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
  var day = ('0' + dateObj.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

function App() {
  const [myData, setMyData] = useState([
    {
      no: 1,
      title: '제목이 들어갑니다..1',
      write: '낙짜쌤',
      date: '23-01-01',
      contents: 'React를 뽀개기',
    },
    {
      no: 2,
      title: '제목이 들어갑니다..2',
      write: '홍길동',
      date: '23-01-02',
      contents: 'React를 뽀개기2222',
    },
    {
      no: 3,
      title: '제목이 들어갑니다..3',
      write: '홍길자',
      date: '23-02-01',
      contents: 'React를 뽀개기33333',
    },
  ]);
  const [mode, setMode] = useState('list');
  const [nextNo, setNextNo] = useState(4);
  const [no, setNo] = useState(null);

  let writeEditComp, selectData;

  if (mode === 'list') {
    writeEditComp = <Write writeAction={(w, c) => {
      let nowDate = nowDateStr();
      let addData = {
        no: nextNo,
        writer: w,
        comment: c,
        date: nowDate
      };
      setNextNo(nextNo + 1);

      // 
      let myDataCopy = [...myData];
      console.log(myDataCopy)
    }} />
  }
  return (
    <div className="App">
      {writeEditComp}
      <h2>댓글 기능 구현</h2>
      <View />
      <hr />
      <List />
      <Write />
    </div>
  );
}

export default App;
