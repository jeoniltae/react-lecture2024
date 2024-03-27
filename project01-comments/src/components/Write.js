const Write = (props) => {
  // const [state, setState] = useState({
  //   id: 0,
  //   writer: "홍길동",
  //   commnet: "",
  //   date: nowDate(),
  // });

  // const handleWriter = (e) => {
  //   const writerVal = e.target.value;

  //   setState({
  //     ...state,
  //     writer: writerVal,
  //   });

  //   console.log('작성자', state);
  // };

  // const handleComment = (e) => {
  //   const commentVal = e.target.value;
  //   setState({
  //     ...state,
  //     commnet: commentVal,
  //   });
  //   console.log('댓글내용', state);
  // }

  // const commentSave = (e) => {
  //   e.preventDefault();
  //   setState({
  //     ...state
  //   });

  //   const copyData = { ...state };
  //   setState({ copyData });
  //   // console.log('copyData', copyData);

  //   console.log('저장버튼클릭시', state);
  // };
  props.writeAction();
  return (
    <>
      <form>
        <table id="boardTable">
          <tbody>
            <tr>
              <td id="writer">Writer : <input type="text" name="writer" /></td>
              <td rowSpan="2"><input type="submit" value="댓글작성" id="btn" /></td>
            </tr>
            <tr>
              <td><textarea name="comment" /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  )
}

export default Write;
