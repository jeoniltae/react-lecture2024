import React from 'react';
// 리덕스 스토어를 생성하기 위한 패키지 임포트
import { legacy_createStore as createStore } from 'redux';
// 리덕스를 적용할 컴포넌트를 감싸주는 Provider 컴포넌트와 리덕스 관련 훅을 위한 패키지 임포트
import { Provider, useSelector, useDispatch } from 'react-redux';
import './App.css';

// 리덕스란?
// 리액트로 제작한 애플리케이션의 상태관리를 위한 라이브러리로 리액트와 함께 사용되지만 써드파티로 제공되기 때문에 별도로 설치해야 함.
// Provider란?
// 어떤 컴포넌트에 state를 제공하지를 결정하는 wrapper컴포넌트로 여기서는 App컴포넌트 하위의 <Left>, <Right>컴포넌트를 감싸준다.
// 그러면 하위 컴포넌트에서 store를 사용할 수 있다.

// store 생성시 주입할 리듀서를 먼저 생성한다. 리듀서는 store에 있는 state를 변경하기 위한 코드를 실행부로 정의한다.
// 파라미터는 2개가 필요하다.
// currentState: 현재 state값
// action: state변경에 필요한 요청 파라미터. 2개 이상의 값을 전달할 수 있어야 하므로 JSON객체를 주로 사용한다.
function reducer(currentState, action) {
  // 만약 state가 정의되지 않았다면 number를 1로 설정한다.
  // 기존의 앱은 App컴포넌트에서 useState 훅을 통해서 생성했지만, 리덕스가 도입되면서 store에서 state를 생성한 후 관리한다.
  if (currentState === undefined) {
    return {
      number: 1,
    };
  }

  // 현재 state의 복사본을 스프레드 연산자를 이용해서 생성한다.
  const newState = { ...currentState };

  // 요청(Action)을 분석한 후 상태(state)를 변경한다.
  if (action.type === 'PLUS') {
    newState.number++;
  }

  // 변경된 state를 반환
  return newState;
};

// 앞에서 생성한 리듀서함수를 인자로 store를 생성한다.
const store = createStore(reducer);

// store가 도입되면서 Right, Left에서 Props를 통해 전달하던 값이나 함수는 더 이상 필요 없다. 모든 state는 store를 통해 관리/전달되기 때문이다.
const Right1 = () => {
  return (
    <div>
      <h2>Right1</h2>
      <Right2 />
    </div>
  );
};

const Right2 = () => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3 />
    </div>
  );
};

// useDispatch훅이란?
// state를 변경할 때 리듀서 함수를 호출하는 역할을 한다.
const Right3 = () => {
  // type를 PLUS로 설정하여 store에 정의된 리듀서 함수를 호출한다. JSON객체로 생성하면 되고, 이 객체를 Action이라고 한다.
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Right3</h2>
      <input type="button" value='+' onClick={() => {
        dispatch({
          type: 'PLUS'
        });
      }} />
    </div>
  );
};

const Left1 = () => {
  return (
    <div>
      <h2>Left1</h2>
      <Left2 />
    </div>
  );
};

const Left2 = () => {
  return (
    <div>
      <h2>Left2</h2>
      <Left3 />
    </div>
  );
};

// useSelector: state값을 선택할때 사용되는 훅
const Left3 = () => {
  // store에 정의된 여러 state중 어떤값을 받을지 정의한 함수 f를 useSelector훅의 인자로 전달한다.
  // function f (state) {
  //   return state.number;
  // }
  // const number = useSelector(f);

  // 위의 정의를 아래와 같이 변경할 수 있다. 화살표 함수로 변경한 후 인수를 사용한다. 즉 여러개의 state중 이 컴포넌트에서 필요한 값을 선택해야하므로 간단한 커스텀 함수를 정의해서 사용해야 한다.
  const number = useSelector(state => state.number);

  return (
    <div>
      <h2>Left3: {number}</h2>
    </div>
  );
};

const App = () => {
  // store가 있으므로 App에서 state를 관리하지 않는다.
  // const [num, setNum] = React.useState(1);

  return (
    <div className="root">
      <h2>리덕스</h2>
      <div id="grid">
        {/* 하위 컴포넌트를 감싸면 store를 사용할 수 있게 된다. 이때 앞에서 생성한 store를 props로 사용해야 한다. */}
        <Provider store={store}>
          {/* App이 state를 관리하지 않으므로 렌더링 시 props를 통해 전달할 필요가 없어진다. 모든 데이터를 store를 통해 가져다 사용하면 된다. */}
          <Left1 />
          <Right1 />
        </Provider>
      </div>
    </div>
  );
}

export default App;
