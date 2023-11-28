import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import styles from "./store.module.scss";
import AdminMenubar from "../AdminMenubar";

// 가게 정보 인터페이스
interface StoreInfo {
  storeName: string;
  storeType: string;
  storeContent: string;
  storeLocation: string;
  openingHour: string;
  storePhone: string;
  waitingTime: number;
}
interface ResInfo {
  storeName: string;
  storeType: string;
  storeContent: string;
  storeLocation: string;
  openingHour: string;
  storePhone: string;
  waitingTime: number;
}

function Store() {
  const [resInfo, setResInfo] = useState<ResInfo>({
    storeName: "",
    storeType: "",
    storeContent: "",
    storeLocation: "",
    openingHour: "",
    storePhone: "",
    waitingTime: 0
  });

const storeId = 5;
useEffect(() => {
  const getresInfo = async () => {
    try {
      const response = await axios.get<StoreInfo>(
        `http://localhost:9000/owner/${storeId}`
      );
      setResInfo({
        storeName: response.data.storeName,
        storeType: response.data.storeType,
        storeContent: response.data.storeContent,
        storeLocation: response.data.storeLocation,
        openingHour: response.data.openingHour,
        storePhone: response.data.storePhone,
        waitingTime: response.data.waitingTime,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getresInfo();
}, [storeId]); // 의존성 배열에 storeId를 추가



  // 입력 필드 변경 핸들러
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSelectChange = (
    //셀렉트 필드 변경 핸들러
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setResInfo((prevInfo) => ({ ...prevInfo, cate: value }));
  };

  // 백엔드로 정보 업데이트
  const updateStoreInfo = async () => {
    console.log(resInfo);
    if (window.confirm("정보를 업데이트 하시겠습니까?")) {
      try {
        const storeId = 5; //임시로 5번 가게로 고정
        const response = await axios.put(
          `http://localhost:9000/owner/${storeId}/update"`,
          resInfo
        );
        if (response.status === 204) {
          alert("가게 정보가 업데이트 되었습니다.");
        } else {
          alert("업데이트 실패했어요");
        }
      } catch (error) {
        console.error("업데이트 실패:", error);
        alert("업데이트 중 오류");
      }
    }
  };

  return (
    <div className={styles.container}>
      <AdminMenubar />
      <div className={styles.right}>
        <div
          style={{
            backgroundImage: `url("https://itimgstorage.blob.core.windows.net/source/img.jpg")`,
          }}
          className={styles.Bannerpic}></div>

        <div className={styles.logoBanner}>
          <img src="/assets/img/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.stores}>
            <input
              type="text"
              name="name"
              value={resInfo.storeName}
              className={styles.menuname}
              onChange={handleChange}
            />
            <select value={resInfo.storeType} onChange={handleSelectChange}>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
            </select>
            <input
            type="text"
              name="txt"
              value={resInfo.storeContent}
              onChange={handleChange}
              className={styles.txt}
            />
          </div>
        </div>
        <div className={styles.infolayout}>
          <p className={styles.infoLogo}>영업 정보</p>
          <h4>주소</h4>
          <input
            type="text"
            name="address"
            value={resInfo.storeLocation}
            onChange={handleChange}
            className={styles.info}
          />

          <h4>영업시간</h4>
          <input
            type="text"
            name="time"
            value={resInfo.openingHour}
            onChange={handleChange}
            className={styles.info}
          />
          <h4>전화번호</h4>

          <input
            type="text"
            name="phone"
            value={resInfo.storePhone}
            onChange={handleChange}
            className={styles.info}
          />

          <h4>한 팀당 웨이팅 시간 (분)</h4>
          <input
            type="number"
            name="waitingTime"
            value={resInfo.waitingTime}
            onChange={handleChange}
            className={styles.info}
          />
        </div>
        <button onClick={updateStoreInfo} className={styles.updateButton}>
          정보 업데이트
        </button>
      </div>
    </div>
  );
}

export default Store;
