import React, { useState } from "react";
import AdminMenubar from "../AdminMenubar";
import styles from "./Menu.module.scss";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root"); //모달이 바인딩 될 DOM 요소를 설정


// 메뉴 아이템 타입 정의
interface MenuItem {
  menu: string;
  price: number;
  img: string;
  txt: string;
}

const Menu = () => {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({menu: "", price: 0, txt: ""});


  //------------------------------모달 관리----------------------------------
  
  const openModal = (menu: MenuItem) => {  // 모달 열기
    setIsOpen(true);
    setSelectedMenu(menu);
  };

  function closeModal() {//모달 닫기
    setIsOpen(false);
  }
  //------------------------------모달 관리----------------------------------

  // 메뉴 정보 배열
  const menuinfo = [
    {
      menu: "김치 라면",
      price: 3000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "얼큰한 맛의 김치국물이 끝내주는 라면",
    },
    {
      menu: "열라면",
      price: 4000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "얼큰한 맛 때문에 열이 나요",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },

    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
  ];

  const menuItems = menuinfo.map((item, index) => (
    <div
      key={index}
      className={styles.menuitem}
      onClick={() => openModal(item)}>
      <img className={styles.menunimg} src={item.img} alt={item.menu} />
      <h1 className={styles.menuname}>{item.menu}</h1>
      <h1 className={styles.menuinfo}>{item.price}원</h1>
      <p className={styles.menuzinfo}>{item.txt}</p>
    </div>
  ));


  const updateMenu = async (e: any) => {
    e.preventDefault(); // 페이지 리로드 방지
    try {
      const response = await axios.post('http://localhost:3001/admin/menuupdate', {
        // menuname: item.menu,
        // price:item.price,
        // menuzinfo: item.txt
      });
      
      if (response.status === 200) {
        alert('메뉴를 저장했습니다.');
        closeModal();
      }
    } catch (error) {
      console.error('메뉴 수정 오류:', error);
      alert('메뉴 수정에 실패했습니다.');
    }
  };

  // 모달 내부
  const modalContent = selectedMenu ? (
    <div>
      <h2>메뉴 수정: {selectedMenu.menu}</h2>
      <form>
        <label>
          메뉴 이름:
          <input type="text" defaultValue={selectedMenu.menu} />
        </label>
        <label>
          가격:
          <input type="number" defaultValue={selectedMenu.price} />
        </label>
        <label>
          설명:
          <textarea defaultValue={selectedMenu.txt} />
        </label>
        <button type="button" onClick={closeModal}>
          취소
        </button>
        <button type="submit" onClick={updateMenu}>저장</button>
      </form>
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      <AdminMenubar />
      <div className={styles.right}>
        <div className={styles.menulayout} onClick={() => setIsOpen(true)}>
          {menuItems}
        </div>
        <Modal
          isOpen={IsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="메뉴 수정">
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

export default Menu;
