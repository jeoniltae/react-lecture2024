import React, { useState } from "react";
import Counter from '../components/Counter';

export default function Player(props) {
  let row = props.playerData;
  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => {
          if (window.confirm('삭제할까요?')) {
            props.onDelPlayer(row.idx);
          }
        }}> x </button>
        {row.name}
      </span>
      {/* App컴포넌트에서 props로 전달된 점수변경 함수를 다시 Counter컴포넌트로 전달함. 또한 일련번호와 점수도 전달. */}
      <Counter idx={row.idx} score={row.score} onChangeScore={props.onChangeScore} />
    </div>
  </>);
}