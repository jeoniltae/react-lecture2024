import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import AddPlayerForm from './components/AddPlayerForm';
import Player from './components/Player';

function App() {
  const [playerData, setPlayerData] = useState([
    { idx: 1, name: '홍길동', score: 10 },
    { idx: 2, name: '손오공', score: 20 },
    { idx: 3, name: '유비', score: 30 },
    { idx: 4, name: '달타냥', score: 40 },
  ]);

  const [nextVal, setNextVal] = useState(5);

  // 이름을 전달받아서 플레이어를 추가
  const addPlayerProcess = (pName) => {
    console.log('onAddPlayer', pName);
    let addPlayer = {
      idx: nextVal,
      name: pName,
      score: 0,
    }

    // 추가 후 화면 리렌더링 됨
    // 배열 데이터의 복사본을 생성한 후 데이터를 추가하고, 이를 통해 state를 변경해야 새롭게 렌더링 된다.
    let copyPlayer = [...playerData];
    copyPlayer.push(addPlayer);
    setPlayerData(copyPlayer);

    // 추가 후 시퀀스 증가
    setNextVal(nextVal + 1);
  };

  // 삭제 버튼 클릭시 플레이어 삭제
  const delPlayerProcess = (playerIdx) => {
    console.log('삭제Idx', playerIdx);

    let newPlayerData = playerData.reduce((prev, curr) => {
      if (curr.idx !== playerIdx) {
        prev.push(curr);
      }
      return prev;
    }, []);

    setPlayerData(newPlayerData);
  };


  // 플레이어의 점수 변경
  const scoreChangeProcess = (flag, playerIdx) => {
    console.log('idx', playerIdx, 'flag', flag);
    // 데이터의 복사본 생성
    let copyPlayers = [...playerData];
    copyPlayers.forEach(row => {
      // 매개변수로 받은 일련번호와 플레이어를 비교
      if (row.idx === playerIdx) {
        console.log(row.name);
        if (flag === '+') {
          row.score += 5
        } else {
          row.score -= 5
        }
      }
    });
    // 변경된 데이터를 통해 state변경 및 재 렌더링
    setPlayerData(copyPlayers);
  };

  return (
    <div className="scoreboard">
      {/* playerData를 props로 전달 */}
      <Header title="My Scoreboard" playersData={playerData} />
      {
        playerData.map((playerRow) => (
          <Player key={playerRow.idx} playerData={playerRow} onChangeScore={scoreChangeProcess} onDelPlayer={delPlayerProcess} />
        ))
      }
      <AddPlayerForm onAddPlayer={addPlayerProcess}></AddPlayerForm>
    </div>
  );
}

export default App;
