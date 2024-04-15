import React, { useEffect, useState } from 'react';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { storage } from './storageConfig';

const App = () => {
  // 스토리지 연결 및 root경로로 참조 생성
  const listRef = ref(storage, '');

  // state: 파일목록, 삭제 후 리렌더링 처리
  const [fileLists, setFileLists] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);

  // 1차 렌더링 완료 후 파일목록을 비동기로 가져온다.
  useEffect(() => {
    let fileRows = [];
    // 생성된 참조에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then(res => {
        res.prefixes.forEach(folderRef => {
          console.log('폴더', folderRef);
        });
        res.items.forEach(itemRef => {
          // 파일 목록 생성시 삭제에 대한 참조 생성
          const deleteRef = ref(storage, itemRef.fullPath);

          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td>
                <button type='button' onClick={e => {
                  if (window.confirm('삭제할까요?')) {
                    // 삭제를 위한 참조를 통해 파일 삭제처리
                    deleteObject(deleteRef).then(() => {
                      console.log('파일 삭제 성공');

                      // 삭제에 성공하면 새롭게 렌더링
                      setRenderFlag(!renderFlag);
                    })
                      .catch(err => {
                        console.log('파일 삭제 실패');
                      });
                  }
                }}>삭제</button>
              </td>
            </tr>
          );
        });
        // 파일 목록이 모두 추가되면 새롭게 렌더링
        setFileLists(fileRows);
      }).catch(err => {
        console.log('에러 발생', err);
      });
  }, [renderFlag]);

  return (
    <div>
      <h2>Firebase - Storage App</h2>
      <h3>파일 목록 및 삭제</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>bucket</th>
            <th>fullpath</th>
            <th>name</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {fileLists}
        </tbody>
      </table>
    </div>
  )
}

export default App;
