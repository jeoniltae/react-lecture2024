import React from "react";

export default function Counter(props) {
  return (<>
    <div className="counter">
      {/* 부모인 Player컴포넌트에서 전달해준 점수변경 함수를 여기서 호출한다 */}
      <button className="counter-action decrement"
        onClick={(e) => {
          props.onChangeScore('-', props.idx);
        }}> -</button>
      <span className="counter-score">{props.score}</span>
      <button className="counter-action increment"
        onClick={(e) => {
          props.onChangeScore('+', props.idx);
        }}> +</button>
    </div>
  </>);
}