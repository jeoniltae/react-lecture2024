import './App.css';

function App() {
  const myStyle = {
    color: 'white',
    backgroundColor: 'blue',
    padding: '10px',
    fontFamily: 'Verdana',
  };

  return (
    <div className="App">
      <h2>React 기본</h2>
      <ol>
        <li style={{ color: 'red' }}>프론트엔드
          <ul style={myStyle}>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>javascript</li>
            <li>jQuery</li>
          </ul>
        </li>
        <li className='backEnd'>백엔드
          <ul>
            <li id='backendSub'>java</li>
            <li>oracle</li>
            <li className='warning'>jsp</li>
            <li>spring boot</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}

export default App;
