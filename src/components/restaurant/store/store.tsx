import React, { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './store.module.scss';
import AdminMenubar from '../AdminMenubar';

// 가게 정보 인터페이스
interface StoreInfo {
  name: string;
  img: string;
  cate: string;
  txt: string;
  address: string;
  time: string;
  phone: string;
  waitingTime: number;
}

function Store() {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: '요우',
    img: 'https://itimgstorage.blob.core.windows.net/source/img.jpg',
    cate: '일식',
    txt: '호텔 일식당 출신 오너 셰프의 코스요리 일식 전문점',
    address: '서울특별시 강남구 논현로 20길 22 1층',
    time: '10:00 ~ 23:00',
    phone: '02-577-9074',
    waitingTime: 10,
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  // 백엔드로 정보 업데이트
  const updateStoreInfo = async () => {
    try {
      const response = await axios.post('http://localhost:9000/updateStore', storeInfo);
      if (response.status === 200) {
        alert('가게 정보가 업데이트되었습니다.');
      } else {
        alert('업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <AdminMenubar />
      <div className={styles.right}>
        <div
          style={{ backgroundImage: `url("https://itimgstorage.blob.core.windows.net/source/img.jpg")` }}
          className={styles.Bannerpic}>
        </div>

        <div className={styles.logoBanner}>
          <img src="/assets/img/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.Stores}>
          <h1  className={styles.menuname}>{storeInfo.name}</h1>
          <h1  className={styles.cate}>{storeInfo.cate}</h1>
            <input name="txt" value={storeInfo.txt} onChange={handleChange} className={styles.txt} />
          </div>
        </div>
        <div className={styles.infolayout}>
          <p className={styles.infoLogo}>영업 정보</p>
          <h4>주소</h4>
          <input type="text" name="address" value={storeInfo.address} onChange={handleChange} className={styles.info} />
         
          
          <h4>영업시간</h4>
          <input type="text" name="time" value={storeInfo.time} onChange={handleChange} className={styles.info} />
          <h4>전화번호</h4>
          <input type="text" name="phone" value={storeInfo.phone} onChange={handleChange} className={styles.info} />
          <h4>한 팀당 웨이팅 시간 (분)</h4>
          <input type="text" name="phone" value={storeInfo.waitingTime} onChange={handleChange} className={styles.info} />
          
        </div>
        <button onClick={updateStoreInfo} className={styles.updateButton}>정보 업데이트</button>
      </div>
    </div>
  );
}

export default Store;