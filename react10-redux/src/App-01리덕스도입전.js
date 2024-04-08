import React from 'react';
import './App.css';

const Right1 = (props) => {
  return (
    <div>
      <h2>Right1</h2>
      <Right2 onMyPlus2={() => {
        props.onMyPlus1();
      }} />
    </div>
  );
};

const Right2 = (props) => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3 onMyPlus3={() => {
        props.onMyPlus2();
      }} />
    </div>
  );
};

const Right3 = (props) => {
  return (
    <div>
      <h2>Right3</h2>
      {/**
       * Right의 최하위 컴포넌트에서는 클릭이벤트를 통해 부모쪽에서 전달된 함수를 호출한다. 그러면 Right3 -> Right2 -> App과 같이 순서대로 호출된다.
       * 즉 +버튼을 누르면 state인 num이 증가되면서 새롭게 증가된다.
       */}
      <input type="button" value='+' onClick={() => {
        props.onMyPlus3();
      }} />
    </div>
  );
};

// App 컴포넌트로부터 전달받은 props를 자식 컴포넌트로 재전달한다.
// 실제 애플리케이션은 이와 같이 중첩된 구조의 UI를 가지게 되므로 여러 뎁스의 컴포넌트 구조를 가지게 된다.
const Left1 = (props) => {
  return (
    <div>
      <h2>Left1: {props.num1}</h2>
      <Left2 num2={props.num1} />
    </div>
  );
};

const Left2 = (props) => {
  return (
    <div>
      <h2>Left2: {props.num2}</h2>
      <Left3 num3={props.num2} />
    </div>
  );
};

const Left3 = (props) => {
  return (
    <div>
      <h2>Left3: {props.num3}</h2>
    </div>
  );
};

function App() {
  const [num, setNum] = React.useState(1);

  return (
    <div className="root">
      <h2>리덕스: {num}</h2>
      <div id="grid">
        <Left1 num1={num} />
        <Right1 onMyPlus1={() => {
          setNum(num + 1);
        }} />
      </div>
    </div>
  );
}

export default App;
