import React from 'react';
import Modal from 'react-modal';
import { MenuItem } from './type';

interface MenuModalProps {
  isOpen: boolean; //모달이 열려있는지 여부
  onRequestClose: () => void; //모달을 닫는 함수입니다. 보통 모달 외부를 클릭하거나 닫기 버튼을 눌렀을 때 호출
  selectedMenu: MenuItem | null; //
  updateMenu: { menuId: Number, menuName: string, menuPrice: number, menuInfo: string}; // 현재 선택된 메뉴의 정보를 담은 객체
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; //사용자의 입력을 처리하는 함수
  postMenu: (e: React.FormEvent) => void; //메뉴 정보를 서버에 저장하는 함수
  isAddMode: boolean; //메뉴 추가 여부
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onRequestClose, selectedMenu, updateMenu, handleChange, postMenu, isAddMode }) => {
    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel={isAddMode ? "메뉴 추가" : "메뉴 수정"}
        >
      {selectedMenu && (
        <div>
           <h2>{isAddMode ? "메뉴 추가" : `메뉴 수정`}</h2>
          <form onSubmit={postMenu}>
            <label>
              메뉴 이름:
              <input
                type="text"
                name="menuName"
                value={isAddMode ? " " : updateMenu.menuName}
                onChange={handleChange}
              />
            </label>
            <label>
              가격:
              <input
                type="number"
                name="menuPrice"
                value={isAddMode ? 0 : updateMenu.menuPrice}
                onChange={handleChange}
              />
            </label>
            <label>
              설명:
              <input
                name="menuInfo"
                value={isAddMode ? "" : updateMenu.menuInfo}
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
            <button type="button" onClick={onRequestClose}>
              취소
            </button>
            <button type="submit">저장</button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default MenuModal;
