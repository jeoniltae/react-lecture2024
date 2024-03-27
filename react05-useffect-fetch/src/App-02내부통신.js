import React, { useEffect, useState } from 'react';

// 목록을 출력하는 컴포넌트
const GlobalTop = (props) => {
  console.log('1. 컴포넌트 실행');
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    console.log('3. useEffect 실행');

    // 컴포넌트가 렌더링된 후 내부에 있는 json파일을 get방식으로 요청한다.
    fetch('./json/myData.json').then(result => {
      // 요청에 성공하면 json파일의 데이터가 매개변수로 콜백된다. 콜백 데이터는 텍스트형식이므로 json형식으로 변환후 반환한다.
      return result.json();
    }).then(json => {
      // 첫번째 then절에서 반환해준 값은 두번째 then절로 넘어온다. 이 값을 받은 후 state를 변경한다.
      console.log(json);
      // state가 변경되면 화면은 새롭게 렌더링된다.
      setMyList(json);
    });

    return () => {
      console.log('4. useEffect 실행2')
    };
  }, []);

  var listTag = [];
  for (let i = 0; i < myList.length; i++) {
    var data = myList[i];
    console.log('데이터', data.id, data.num);
    listTag.push(
      <li key={data.id}>
        <a href={data.id} data-id={data.num} onClick={e => {
          e.preventDefault();
          props.myLinkClick(e.target.dataset.id);
        }}>
          {data.id}
        </a>
      </li>
    );
  }
  console.log('2. return문 실행');
  return (
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  );
};

// props로 전달된 객체의 값을 화면에 출력하는 컴포넌트
const ContentBody = (props) => {
  return (
    <div>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num: {props.myResult.num}</li>
        <li>id: {props.myResult.id}</li>
        <li>cell: {props.myResult.cell}</li>
        <li>description: {props.myResult.description}</li>
      </ul>
    </div>
  );
};

function App() {
  const [myResult, setMyResult] = useState({});
  return (
    <div className="App">
      <h2>React - 내부 서버 통신</h2>
      {/* 클릭시 내부에 저장된 dot.json파일을 get방식으로 요청한 후 콜백 데이터를 받을 수 있는 기능의 함수를 props로 전달한다. */}
      <GlobalTop myLinkClick={num => {
        console.log('클릭', num);
        fetch(`./json/dto${num}.json`).then(result => {
          console.log('결과1', result);
          return result.json();
        }).then(json => {
          console.log('결과2', json);
          setMyResult(json);
        });
      }} />

      <ContentBody myResult={myResult} />
    </div>
  );
}

export default App;
