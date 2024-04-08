import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

/**
 * .env파일에 아래처럼 환경설정 필요
 */
// REACT_APP_apiKey=AIzaSyDvqGiX4_uizLKtRMFpb-YjanMnMwifJCs
// REACT_APP_authDomain=myreactproject-e4f42.firebaseapp.com
// REACT_APP_projectId=myreactproject-e4f42
// REACT_APP_storageBucket=myreactproject-e4f42.appspot.com
// REACT_APP_messagingSenderId=905042370686
// REACT_APP_appId=1:905042370686:web:41e89cfd1c1c4da3cc782f
// REACT_APP_measurementId=G-FWS7JEG6W5

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };