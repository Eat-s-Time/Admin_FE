import React, { useEffect, useState } from "react";
import AdminMenubar from "../AdminMenubar";
import styles from "./Menu.module.scss";
import Modal from "react-modal";
import axios from "axios";
import MenuModal from "./MenuModal";
import { MenuItem } from "./type";

Modal.setAppElement("#root"); //모달이 바인딩 될 DOM 요소를 설정

// 메뉴 아이템 타입 정의

const Menu = () => {
  const [IsOpen, setIsOpen] = useState<boolean>(false); //모달 관리
  const [menuInfoList, setMenuInfo] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null); //모달로 열 메뉴 정보를 상태 관리
  const [isAddMode, setIsAddMode] = useState<boolean>(false); //false는 메뉴 수정

  const [updateMenu, setUpdateMenu] = useState({
    // 수정할 메뉴의 정보를 상태 관리
    menuId: 0,
    menuName: "",
    menuPrice: 0,
    menuInfo: "",
    // menuImg: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
  });

  //------------------------------모달 관리----------------------------------

  // 모달 열기
  const onClickMenu = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setUpdateMenu({
      menuId: menu.menuId,
      menuName: menu.menuName,
      menuPrice: menu.menuPrice,
      menuInfo: menu.menuInfo,
      // menuImg: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
    });
    setIsOpen(true);
  };

  function closeModal() {
    //모달 닫기
    setUpdateMenu({
      menuId: 0,
      menuName: "",
      menuPrice: 0,
      menuInfo: "",
      // menuImg: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
    });
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

  const menuItems = menuInfoList.map((item) => (
    <div key={item.menuId} className={styles.menuitem}>
      <div
        key={item.menuId}
        className={styles.menuitem}
        onClick={() => onClickMenu(item)}>
        {/* <img className={styles.menunimg} src={item.img} alt={item.menuName} /> */}
        <h1 className={styles.menuname}>{item.menuName}</h1>
        <h1 className={styles.menuinfo}>{item.menuPrice}원</h1>
        <p className={styles.menuinfo}>{item.menuInfo}</p>
      </div>
    </div>
  ));

  const storeId = 28; //임시로 28번 가게로 설정
  //-------------------백엔드 통신 -----------------------------------------------------
  const getMenu = async () => {
    try {
      const response = await axios.get<MenuItem[]>(
        `http://localhost:9000/owner/stores/${storeId}/menus`
      );
      const newMenuInfo = response.data.map((item) => ({
        menuId: item.menuId,
        menuPrice: item.menuPrice,
        menuInfo: item.menuInfo,
        menuName: item.menuName,
        img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      }));
      setMenuInfo(newMenuInfo);
    } catch (error) {
      console.log("백엔드", error);
    }
  };

  const postMenu = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 리로드 방지
    try {
      console.log(updateMenu);
      const response = await axios.post(
      `http://localhost:9000/owner/stores/${storeId}/menus/upload`,
        updateMenu
      );

      if (response.status === 200) {
        alert("메뉴 저장");
        closeModal();
      }
    } catch (error) {
      console.error("메뉴 수정 오류:", error);
      alert("메뉴 수정 실패.");
    }
  };

  //메뉴 추가

  useEffect(() => {
    getMenu();
  }, [storeId]);

  //--------------------------------------------------------
  return (
    <div className={styles.container}>
      <AdminMenubar />
      <div className={styles.right}>
        <div
          className={styles.menuInput}
          onClick={() => {
            setIsOpen(true);
            setIsAddMode(true);
          }}>
          {" "}
          + 메뉴추가
        </div>

        <div
          className={styles.menulayout}
          onClick={() => {
            setIsOpen(true);
            setIsAddMode(false);
          }}>
          {menuItems}
        </div>
        <MenuModal
          isOpen={IsOpen}
          onRequestClose={() => setIsOpen(false)}
          selectedMenu={selectedMenu}
          updateMenu={updateMenu}
          handleChange={handleChange}
          postMenu={postMenu}
          isAddMode={isAddMode}
        />
      </div>
    </div>
  );
};

export default Menu;
