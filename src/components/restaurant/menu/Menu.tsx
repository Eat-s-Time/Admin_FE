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
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null); //모달로 열 메뉴 정보를 상태 관리
  const [updateMenu, setUpdateMenu] = useState({
    // 수정할 메뉴의 정보를 상태 관리
    menuId: "",
    menuName: "",
    menuPrice: 0,
    menuInfo: "",
    menuImg: "",
  });

  //------------------------------모달 관리----------------------------------

  const openModal = (menu: MenuItem, index: number) => {
    // 모달 열기
    setSelectedMenu(menu);
    setUpdateMenu({
      menuId: index.toString(), // index를 문자열로 변환
      menuName: menu.menu,
      menuPrice: menu.price,
      menuInfo: menu.txt,
      menuImg: menu.img,
    });
  };

  function closeModal() {
    //모달 닫기
    setIsOpen(false);
  }
  //------------------------------모달 관리----------------------------------

  // 메뉴 정보를 수정하는 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateMenu({
      ...updateMenu,
      [name]: value,
    });
  };

  // 메뉴 정보 임시 배열
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
      onClick={() => openModal(item, index)}>
      <img className={styles.menunimg} src={item.img} alt={item.menu} />
      <h1 className={styles.menuname}>{item.menu}</h1>
      <h1 className={styles.menuinfo}>{item.price}원</h1>
      <p className={styles.menuzinfo}>{item.txt}</p>
    </div>
  ));

//-------------------백엔드 통신 -----------------------------------------------------
  const getMenu = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/{storeId}/menu"
      );
      console.log(response);
    } catch (error) {}
  };
  
  const postMenu = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 리로드 방지
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/{storeId}/updateMenu",
        updateMenu
      );
      //menuId: 
      // menuName: item.menu,
      // menuPrice:item.price,
      // menuInfo: item.txt
      // menuImg: item.img

      if (response.status === 200) {
        alert("메뉴 저장");
        closeModal();
      }
    } catch (error) {
      console.error("메뉴 수정 오류:", error);
      alert("메뉴 수정 실패.");
    }
  };

//useEffect(() => {
  // getMenu();
// }

  const modalContent = selectedMenu ? (
    <div>
      <h2>메뉴 수정: {selectedMenu.menu}</h2>
      <form onSubmit={postMenu}>
        <label>
          메뉴 이름:
          <input
            type="text"
            name="menuName"
            value={updateMenu.menuName}
            onChange={handleChange}
          />
        </label>
        <label>
          가격:
          <input
            type="number"
            name="menuPrice"
            value={updateMenu.menuPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          설명:
          <input
            name="menuInfo"
            value={updateMenu.menuInfo}
            onChange={handleChange}
          />
        </label>
        <label>
          이미지 URL:
          <input
          type="file"
          name="menuImg"
          onChange={handleChange}
          accept="image/*"
        />
        </label>
        <button type="button" onClick={closeModal}>
          취소
        </button>
        <button type="submit">저장</button>
      </form>
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      <AdminMenubar />
      <div className={styles.right}>
        <div className={styles.menuInput}> + 메뉴추가</div>
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
