import React, { useEffect, useState } from "react";
import styles from "./WaitingList.module.scss";
import { BiMailSend } from "react-icons/bi";
import { LuDoorOpen } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import AdminMenubar from "../AdminMenubar";
import sendEmail from "../../../mail";
import axios from "axios";

interface guestList {
  time: string;
  price: string;
  name: string;
  email: string;
}

interface WaitingListProps {
  waitingList: guestList[];
}

const WaitingList = ({ waitingList }: WaitingListProps) => {
  const [waitingBoolean, setWaitingBoolean] = useState<boolean | null>(null);

  const guestList: guestList[] = [
    {
      time: "11:30",
      price: "성인 2 유아 0",
      name: "이하린",
      email: "hllee0000@daum.net",
    },
    {
      time: "11:31",
      price: "성인 2 유아 0",
      name: "양하연",
      email: "hayun4475@gmail.com",
    },
    {
      time: "11:31",
      price: "성인 3 유아 0",
      name: "김주희",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
    {
      time: "11:39",
      price: "성인 2 유아 0",
      name: "이진우",
      email: "www@1234.com",
    },
  ];

  const call = (email: string) => {
    if (window.confirm("해당 고객을 호출하시겠습니까?")) {
      const message =
        "고객님. 지금 입장해주세요. 5분동안 미 입장시, 대기 접수가 자동 취소되며, 다시 대기 등록을 해주셔야합니다. ";
      sendEmail(email, message);
    }
  };

  const enter = (email: string) => {
    const message = "고객님. 웨이팅하신 식당은 어떠셨나요? 리뷰를 남겨주세요.";
    setTimeout(() => sendEmail(email, message), 3 * 60 * 60 * 1000); //입장 후, 3시간 뒤에 발송
  };

  const cancle = (email: string) => {
    if (window.confirm("해당 고객의 웨이팅을 취소하시겠습니까?")) {
      const index = guestList.findIndex((guest) => guest.email === email);
      guestList.splice(index, 1);

      // window.location.reload();
      const message =
        "고객님. 웨이팅하신 식당의 웨이팅이 취소되었습니다. 문제가 발생하셨을 경우, 해당 식당에 문의하시길 바랍니다. ";
      //  sendEmail(email, message);
    }
  };

  //임시 가게
  const storeId = 1;

  //웨이팅 상세조회
  const loadWaitingStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/owner/${storeId}`
      );
      setWaitingBoolean(response.data.waitingPossible);
    } catch (error) {
      console.log("웨이팅 정보 로드 실패", error);
    }
  };
  useEffect(() => {
    loadWaitingStatus();
  }, []);

  const updateWaitingStatus = async (newStatus: boolean) => {
    if (
      window.confirm(
        newStatus ? "웨이팅을 시작하시겠습니까?" : "웨이팅을 마감하시겠습니까?"
      )
    ) {
      try {
        console.log("WaitingStatus:", newStatus);
        const response = await axios.put(
          `http://localhost:9000/store/${storeId}/updateWaitingPossible?waitingPossible=${newStatus}`,
        );
        if (response.status === 200) {
          alert("웨이팅 상태가 변경되었습니다.");
          setWaitingBoolean(newStatus);
        }
      } catch (error) {
        console.error("웨이팅 상태 변경 오류:", error);
        alert("웨이팅 상태 변경 실패.");
      }
    }
  };

  return (
    <div className={styles.background}>
      <AdminMenubar />
      <div className={styles.container}>
        <div className={styles.numberContainer}>
          <h1 className={styles.number}>대기 {guestList.length}명</h1>
        </div>
        <div className={styles.marginDiv}></div>
        {guestList.map((waiting, index) => (
          <div className={styles.guestContainer} key={index}>
            <div className={styles.rankingContainer}>
              <p className={styles.p}>{index + 1}</p>
              <h1 className={styles.h1}>{waiting.time}</h1>
            </div>
            <div className={styles.guestInfoContainer}>
              <h1>{waiting.name}</h1>
              <h1>{waiting.price}</h1>
              <h1>{index + 1}순위</h1>
            </div>
            <div className={styles.btnContainer}>
              <button
                className={styles.bookbtn}
                onClick={() => call(waiting.email)}>
                <BiMailSend />
                호출
              </button>
              <button className={styles.bookbtn}>
                <LuDoorOpen />
                입장
              </button>
              <button
                className={styles.bookbtn}
                onClick={() => cancle(waiting.email)}>
                <FiAlertTriangle />
                거절
              </button>
            </div>
          </div>
        ))}
        {waitingBoolean ? (
          <div
            className={styles.waitingDead}
            onClick={() => updateWaitingStatus(false)}>
            웨이팅 마감하기
          </div>
        ) : (
          <div
            className={styles.waitingStart}
            onClick={() => updateWaitingStatus(true)}>
            웨이팅 시작하기
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingList;
