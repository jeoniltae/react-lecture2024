import React from 'react';

const Box = ({ createBoxStyle }) => {
  const [style, setStyle] = React.useState({});

  React.useEffect(() => {
    console.log('박스 키우기');
    setStyle(createBoxStyle);
  }, [createBoxStyle]);

  return (
    <div style={style}></div>
  )
}

const App = () => {
  const [size, setSize] = React.useState(100);
  const [isDark, setIsDark] = React.useState(false);

  // step1: App컴포넌트가 렌더링 될때마다 새로운 참조값이 부여된다. 따라서 테마 변경을 눌러도 이와 상관없는 박스키우기가 출력된다.
  // const createBoxStyle = {
  //   backgroundColor: 'pink',
  //   width: `${size}px`,
  //   height: `${size}px`,
  //   transition: 'all 0.2s',
  // };

  const createBoxStyle = React.useCallback(() => {
    return {
      backgroundColor: 'pink',
      width: `${size}px`,
      height: `${size}px`,
      transition: 'all 0.2s',
    }
  }, [size]);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: isDark ? 'black' : 'white',
    }}>
      <h2 style={{ color: isDark ? 'white' : 'black', }}>useCallback()</h2>
      {/*  */}
      <input type="number" value={size} step={5} onChange={e => setSize(e.target.value)} />

      <button onClick={() => setIsDark(!isDark)}>테마 변경</button>
      <Box createBoxStyle={createBoxStyle} />
    </div>
  )
}

export default App;
