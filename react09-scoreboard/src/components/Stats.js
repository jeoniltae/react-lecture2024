import React from "react";

export default function Stats(props) {
  // 플레이어 수
  let playersCount = props.playersData.length;

  // 점수 총합
  let totalPoint = props.playersData.reduce((prev, curr) => {
    console.log(curr.name + '점수', curr.score);
    // prev의 초기값을 0으로 설정한 후 데이터의 크기만큼 반복해서 점수를 누적해서 더한다. 최종적으로 누적된 prev를 반환한다
    prev += curr.score;
    return prev;
  }, 0);

  return (<>
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playersCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoint}</td>
        </tr>
      </tbody>
    </table>
  </>);
}