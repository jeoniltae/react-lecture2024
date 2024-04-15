import React from 'react';

const App = () => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    console.log(inputRef);
    inputRef.current.focus();
  }, []);

  const login = () => {
    alert(`웰컴! ${inputRef.current.value}`);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  return (
    <div>
      <input type='text' placeholder='ID' ref={inputRef} />
      <button onClick={login}>로그인</button>
    </div>
  )
}

export default App;
